import React, {
  ReactNode, useEffect, useRef
} from 'react';
import './PageWithSections.scss';
import {
  Preloader, Tabs, Tile
} from '../../../../index';
import { IPageSection } from '../../../../types/projects.types';
import useTableOfContents from '../../../../hooks/useTableOfContents';
import { Link } from 'react-router-dom';
import Chevron from '../../../_icons/chevron-alt';
import ResizeObserver from 'resize-observer-polyfill';
import { ITab } from '../../../../types';

export interface IPageWithSectionsProps {
  title: ReactNode;
  backUrl?: string;
  onBackUrlClick?: () => void;
  sections?: IPageSection[];
  /** Fixed action menu */
  actionMenu?: ReactNode;
  preloader?: boolean;
  showNavigation?: boolean;
  /** Navigation tabs */
  navigation?: ITab[];
}

const PageWithSections: React.FC<IPageWithSectionsProps> = ({
  title,
  backUrl,
  onBackUrlClick,
  sections,
  actionMenu,
  preloader = false,
  showNavigation = true,
  navigation
}: IPageWithSectionsProps) => {

  /** Ссылка на навигацию */
  const asideRef = useRef<HTMLDivElement>(null);
  /** Ссылка на меню */
  const actionMenuRef = useRef<HTMLDivElement>(null);
  /** Ссылка на секции */
  const sectionsRef = useRef<HTMLDivElement>(null);
  /** Ссылка на ползунок */
  const sliderRef = useRef<HTMLDivElement>(null);
  /** Ссылка на линию */
  const lineRef = useRef<HTMLDivElement>(null);
  /** Ссылка на страницу */
  const pageRef = useRef<HTMLDivElement>(null);
  /** Ссылка на шапку страницы */
  const pageHeaderRef = useRef<HTMLDivElement>(null);

  /** Дополнительной отступ для активации секции в оглавлении */
  const ADDITIONAL_SCROLL_OFFSET = 40;

  // -------------------------------------------------------------------------------------------------------------------

  /** Расчет координаты для Aside */
  useEffect(() => {
    const calculateRightPosition = () => {
      // todo нужно проверить
      const widthDelta = window.innerWidth - 980 - 192;

      if (asideRef.current) {
        if (widthDelta > 0) {
          asideRef.current.style.right = `${widthDelta - 120 + 20}px`;
        }
      }
    };

    setTimeout(() => {
      calculateRightPosition();
    });

    window.addEventListener('resize', calculateRightPosition);

    return () => {
      window.removeEventListener('resize', calculateRightPosition);
    };
  }, [actionMenu]);


  // -------------------------------------------------------------------------------------------------------------------

  /** Отображение секций */
  const sectionsJSX = sections?.map((section: IPageSection) => {
    return (
      <section key={ section.id } className='rf-page__section-block'>
        <Tile>
          { section.title && <h2 className='rf-page__section-title' id={ section.id }>{ section.title }</h2> }
          { section.component }
        </Tile>
      </section>
    );
  });

  // -------------------------------------------------------------------------------------------------------------------

  /** Активная секция при скролле */
  const { activeIndex } = useTableOfContents({
    selector: '.rf-page__section-title',
    additionalOffset: ADDITIONAL_SCROLL_OFFSET,
    deps: [preloader]
  });

  /** Боковая навигация для секций */
  const asideJSX = sections?.filter((section: IPageSection) => !!section.title)
    .map((section: IPageSection) => {
      const onNavClick = () => {
        const block = document.getElementById(section.id);

        if (block && pageHeaderRef.current) {
          const top = block.getBoundingClientRect().top + pageYOffset - ADDITIONAL_SCROLL_OFFSET;
          window.scrollTo(0, top);
        }
      };

      return (
        <div key={ section.id } className='rf-page__aside-link' onClick={ onNavClick }>
          { section.title }
        </div>
      );
    });

  /** Передвигаем слайдер к активной секции */
  useEffect(() => {
    setTimeout(() => {
      if (sliderRef.current) {
        const navLinks = document.querySelectorAll('.rf-page__aside-link');
        const navLink = navLinks[activeIndex >= navLinks.length ? navLinks.length - 1 : activeIndex];

        if (asideRef.current && navLink) {
          sliderRef.current.style.top = `${navLink.getBoundingClientRect().top - asideRef.current.getBoundingClientRect().top}px`;
        }
      }
    });
  }, [activeIndex]);


  // -------------------------------------------------------------------------------------------------------------------

  const showAside = !!sections && sections.some((s: IPageSection) => !!s.title);

  const asideBlock = showNavigation && showAside && (
    <aside className='rf-page__content-aside' ref={ asideRef }>
      <div className='rf-page__aside-inner'>
        <div className='rf-page__aside-bar' ref={ lineRef }>
          <div className='rf-page__aside-slider' ref={ sliderRef }/>
        </div>

        <nav className='rf-page__aside-nav'>
          { asideJSX }
        </nav>
      </div>
    </aside>
  );

  // -------------------------------------------------------------------------------------------------------------------

  const onBackClick = (e: React.MouseEvent) => {
    if (onBackUrlClick) {
      e.preventDefault();
      onBackUrlClick();
    }
  };

  // -------------------------------------------------------------------------------------------------------------------

  const calculateMenuPosition = () => {
    if (!pageRef.current || !sectionsRef.current || !actionMenuRef.current || !pageHeaderRef.current || preloader) {
      return;
    }

    if (pageRef.current.offsetHeight > document.documentElement.clientHeight) {
      actionMenuRef.current.style.bottom = '20px';
      actionMenuRef.current.style.top = 'auto';
    } else {
      actionMenuRef.current.style.bottom = 'auto';
      actionMenuRef.current.style.top = sectionsRef.current.offsetHeight + pageHeaderRef.current.offsetHeight + 'px';
    }
  };


  useEffect(() => {
    if (!sectionsRef.current) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      calculateMenuPosition();
    });

    resizeObserver.observe(sectionsRef.current);
  }, [preloader]);

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className='rf-sections-page' ref={ pageRef }>
      <header className='rf-page__sections-header' ref={ pageHeaderRef }>
        { backUrl && (
          <Link to={ backUrl } onClick={ onBackClick } className='rf-page__sections-header-back'>
            <Chevron/>
          </Link>
        ) }
        <h2 className='rf-page__sections-title'>{ title }</h2>
      </header>


      {navigation && (
        <div className='rf-page__tabs'>
          <Tabs list={navigation}/>
        </div>
      )}

      <div className='rf-page__content--sections'>

        {
          preloader ? <Preloader/> : (
            <>
              <div className='rf-page__content-sections' ref={ sectionsRef }>
                { sectionsJSX }
              </div>

              { asideBlock }
            </>
          )
        }
      </div>

      { !preloader && actionMenu && (
        <div className='rf-sections__action-menu' ref={ actionMenuRef }>
          { actionMenu }
        </div>
      ) }
    </div>
  );
};
export default PageWithSections;
