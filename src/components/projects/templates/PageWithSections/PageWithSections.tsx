import React, {
  ReactNode, useEffect, useRef
} from 'react';
import { Tile } from '../../../../index';
import { IPageSection } from '../../../../types/projects.types';
import useTableOfContents from '../../../../hooks/useTableOfContents';


interface IPageWithSectionsProps {
  sections?: IPageSection[];
  /** Fixed action menu */
  actionMenu?: ReactNode;
}

const PageWithSections: React.FC<IPageWithSectionsProps> = ({
  sections,
  actionMenu
}: IPageWithSectionsProps) => {

  /** Ссылка на навигацию */
  const asideRef = useRef<HTMLDivElement>(null);
  /** Ссылка на меню */
  const actionMenuRef = useRef<HTMLDivElement>(null);
  /** Ссылка на секции */
  const sectionsRef = useRef<HTMLDivElement>(null);
  /** Ссылка на разделитель скролла */
  const dividerRef = useRef<HTMLDivElement>(null);
  /** Ссылка на ползунок */
  const sliderRef = useRef<HTMLDivElement>(null);
  /** Ссылка на линию */
  const lineRef = useRef<HTMLDivElement>(null);

  /** Прокрутка до отображения разделителя */
  const SHOW_DIVIDER_SCROLL_TOP = 10;
  /** Дополнительной отступ для активации секции в оглавлении */
  const ADDITIONAL_SCROLL_OFFSET = 30;

  // -------------------------------------------------------------------------------------------------------------------

  /** Расчет координаты для Aside */
  useEffect(() => {
    const calculateRightPosition = () => {

      const pageHeader = document.querySelector('.rf-page__header') as HTMLElement;
      const widthDelta = window.innerWidth - 1368;

      if (asideRef.current) {

        let actionMenuHeight = 0;

        if (!actionMenu) {
          actionMenuHeight = 0;
        }

        if (actionMenuRef.current) {
          actionMenuHeight = actionMenuRef.current.offsetHeight;
          actionMenuRef.current.style.top = `${pageHeader.offsetHeight}px`;
        }

        if (pageHeader) {
          asideRef.current.style.top = `${pageHeader.offsetHeight + actionMenuHeight}px`;
        }

        if (widthDelta > 0) {
          asideRef.current.style.right = `${widthDelta + 40}px`;
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

  /** Показать разделитель при скролле */
  useEffect(() => {
    const onScroll = () => {
      if (dividerRef.current) {
        dividerRef.current.style.opacity = pageYOffset >= SHOW_DIVIDER_SCROLL_TOP ? '1' : '0';
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // -------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (sectionsRef.current) {
      if (!actionMenu) {
        sectionsRef.current.style.paddingTop = '0';
      } else if (actionMenuRef.current) {
        sectionsRef.current.style.paddingTop = `${actionMenuRef.current.offsetHeight}px`;
      }
    }
  }, [actionMenu]);

  // -------------------------------------------------------------------------------------------------------------------

  /** Отображение секций */
  const sectionsJSX = sections?.map((section: IPageSection) => {
    return (
      <section key={section.id} className='rf-page__section'>
        <h2 className='rf-page__section-title' id={section.id}>{section.title}</h2>
        <Tile>
          {section.component}
        </Tile>
      </section>
    );
  });

  // -------------------------------------------------------------------------------------------------------------------

  /** Активная секция при скролле */
  const { activeTitleId, activeIndex } = useTableOfContents({
    container: sectionsRef,
    selector: '.rf-page__section-title',
    additionalOffset: ADDITIONAL_SCROLL_OFFSET + (actionMenuRef.current ? actionMenuRef.current.offsetHeight : 0)
  });

  // -------------------------------------------------------------------------------------------------------------------
  /** Боковая навигация для секций */
  const asideJSX = sections?.filter((section: IPageSection) => !!section.title)
    .map((section: IPageSection) => {
      const onNavClick = () => {
        const pageHeader = document.querySelector('.rf-page__header') as HTMLElement;
        const block = document.getElementById(section.id);

        if (block && pageHeader) {
          const menuOffset = actionMenuRef.current ? actionMenuRef.current.offsetHeight : 0;
          const top = block.getBoundingClientRect().top + pageYOffset - pageHeader.offsetHeight - menuOffset;
          window.scrollTo(0, top);
        }
      };

      return (
        <div key={section.id} className='rf-page__aside-link' onClick={onNavClick}>
          {section.title}
        </div>
      );
    });

  useEffect(() => {
    setTimeout(() => {
      if (sliderRef.current) {
        const pageHeader = document.querySelector('.rf-page__header') as HTMLElement;
        const navLinks = document.querySelectorAll('.rf-page__aside-link');
        const navLink = navLinks[activeIndex];

        if (pageHeader && navLink) {
          const menuOffset = actionMenuRef.current ? actionMenuRef.current.offsetHeight : 0;
          sliderRef.current.style.top = `${navLink.getBoundingClientRect().top - pageHeader.offsetHeight - menuOffset}px`;
        }
      }
    });
  }, [activeTitleId]);


  // -------------------------------------------------------------------------------------------------------------------

  return (
    <>
      {actionMenu && (
        <div className='rf-page__action-menu' ref={actionMenuRef}>
          <div className='rf-page__action-menu-inner'>
            <div className='rf-page__action-menu-divider' ref={dividerRef}/>
            {actionMenu}
          </div>
        </div>
      )}

      <div className='rf-page__content--sections'>

        <div className='rf-page__content-sections' ref={sectionsRef}>
          {sectionsJSX}
        </div>

        <aside className='rf-page__content-aside' ref={asideRef}>
          <div className='rf-page__aside-inner'>
            <div className='rf-page__aside-bar' ref={lineRef}>
              <div className='rf-page__aside-slider' ref={sliderRef}/>
            </div>

            <nav className='rf-page__aside-nav'>
              {asideJSX}
            </nav>
          </div>
        </aside>
      </div>
    </>
  );
};
export default PageWithSections;
