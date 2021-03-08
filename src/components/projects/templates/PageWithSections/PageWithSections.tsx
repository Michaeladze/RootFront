import React, {
  ReactNode, useEffect, useRef
} from 'react';
import { Tile } from '../../../../index';
import { IPageSection } from '../../../../types/projects.types';
import { detect } from 'detect-browser';


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
  /** Ссылка на ползунок */
  // const sliderRef = useRef<HTMLDivElement>(null);
  /** Ссылка на линию */
  const lineRef = useRef<HTMLDivElement>(null);
  /** Ссылка на меню */
  const actionMenuRef = useRef<HTMLDivElement>(null);
  /** Ссылка на секции */
  const sectionsRef = useRef<HTMLDivElement>(null);

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
        }

        if (pageHeader) {
          asideRef.current.style.top = `${pageHeader.offsetHeight + actionMenuHeight}px`;
        }

        if (widthDelta > 0) {
          asideRef.current.style.right = `${widthDelta + 40}px`;
        }
      }
    };

    calculateRightPosition();
    window.addEventListener('resize', calculateRightPosition);

    return () => {
      window.removeEventListener('resize', calculateRightPosition);
    };
  }, [actionMenu]);

  // -------------------------------------------------------------------------------------------------------------------

  // /** Изменение координаты слайдера при скролле */
  // useEffect(() => {
  //   let onScroll: null | (() => void) = null;
  //   const page = document.querySelector('.rf-page') as HTMLElement;
  //
  //   if (page) {
  //
  //     setTimeout(() => {
  //       const pageHeader = page.querySelector('.rf-page__header') as HTMLElement;
  //
  //       if (lineRef.current && sliderRef.current && pageHeader) {
  //         const pageHeight = page.offsetHeight + pageHeader.offsetHeight;
  //         const clientHeight = document.documentElement.clientHeight;
  //
  //         const sliderHeight = sliderRef.current.offsetHeight;
  //         const lineHeight = lineRef.current.offsetHeight - sliderHeight;
  //
  //         const k1 = (pageHeight - clientHeight) / (pageHeight / lineHeight);
  //         const k2 = lineHeight * lineHeight / k1;
  //
  //         onScroll = () => {
  //           if (sliderRef.current) {
  //             sliderRef.current.style.top = document.documentElement.scrollTop * k2 / pageHeight + 'px';
  //           }
  //         };
  //
  //         window.addEventListener('scroll', onScroll);
  //       }
  //     });
  //   }
  //
  //   return () => {
  //     if (onScroll) {
  //       window.removeEventListener('scroll', onScroll);
  //     }
  //   };
  // }, [actionMenu]);

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
      <section key={section.id} id={section.id} className='rf-page__section'>
        <h2 className='rf-page__section-title'>{section.title}</h2>
        <Tile>
          {section.component}
        </Tile>
      </section>
    );
  });

  // -------------------------------------------------------------------------------------------------------------------

  /** Боковая навигация для секций */
  const asideJSX = sections?.filter((section: IPageSection) => !!section.title)
    .map((section: IPageSection) => {
      const onNavClick = () => {
        const pageHeader = document.querySelector('.rf-page__header') as HTMLElement;
        const block = document.getElementById(section.id);

        if (block && pageHeader && actionMenuRef.current) {

          const top = block.getBoundingClientRect().top + pageYOffset - pageHeader.offsetHeight - actionMenuRef.current.offsetHeight;

          const browser = detect();
          switch (browser && browser.name) {
          case 'chrome':
          case 'firefox':
            window.scrollTo({
              top,
              behavior: 'smooth'
            });
            break;

          default:
            window.scrollTo(0, top);
          }
        }
      };

      return (
        <div key={section.id} className='rf-page__aside-link' onClick={onNavClick}>
          {section.title}
        </div>
      );
    });


  // -------------------------------------------------------------------------------------------------------------------

  return (
    <>
      {actionMenu && (
        <div className='rf-page__action-menu' ref={actionMenuRef}>
          <div className='rf-page__action-menu-inner'>
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
              {/* <div className='rf-page__aside-slider' ref={sliderRef}/>*/}
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
