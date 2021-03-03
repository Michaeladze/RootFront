import React, { useEffect, useRef } from 'react';
import { Tile } from '../../../../index';
import { IPageSection } from '../../../../types/projects.types';


interface IPageWithSectionsProps {
  sections?: IPageSection[];
}

const PageWithSections: React.FC<IPageWithSectionsProps> = ({ sections }: IPageWithSectionsProps) => {

  /** Ссылка на навигацию */
  const asideRef = useRef<HTMLDivElement>(null);
  /** Ссылка на ползунок */
  const sliderRef = useRef<HTMLDivElement>(null);
  /** Ссылка на линию */
  const lineRef = useRef<HTMLDivElement>(null);

  // -------------------------------------------------------------------------------------------------------------------

  /** Расчет координаты для Aside */
  useEffect(() => {
    const calculateRightPosition = () => {
      const pageHeader = document.querySelector('.rf-page__header') as HTMLElement;
      const widthDelta = window.innerWidth - 1368;

      if (asideRef.current) {
        if (pageHeader) {
          asideRef.current.style.top = `${pageHeader.offsetHeight}px`;
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
  }, []);

  // -------------------------------------------------------------------------------------------------------------------

  /** Изменение координаты слайдера при скролле */
  useEffect(() => {
    const page = document.querySelector('.rf-page') as HTMLElement;

    if (page) {
      const pageHeader = page.querySelector('.rf-page__header') as HTMLElement;

      if (lineRef.current && sliderRef.current && pageHeader) {
        const pageHeight = page.offsetHeight + pageHeader.offsetHeight;
        const clientHeight = document.documentElement.clientHeight;

        const sliderHeight = sliderRef.current.offsetHeight;
        const lineHeight = lineRef.current.offsetHeight - sliderHeight;

        const k1 = (pageHeight - clientHeight) / (pageHeight / lineHeight);
        const k2 = lineHeight * lineHeight / k1;

        window.addEventListener('scroll', () => {
          if (sliderRef.current) {
            sliderRef.current.style.top = document.documentElement.scrollTop * k2 / pageHeight + 'px';
          }
        });
      }
    }
  }, []);

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
  const asideJSX = sections?.map((section: IPageSection) => {
    const onNavClick = () => {
      const pageHeader = document.querySelector('.rf-page__header') as HTMLElement;
      const block = document.getElementById(section.id);

      if (block && pageHeader) {

        const top = block.getBoundingClientRect().top + pageYOffset - pageHeader.offsetHeight;
        const msie = window.navigator.userAgent.indexOf('MSIE ');

        if (msie > 0) {
          window.scrollTo(0, top);
        } else {
          window.scrollTo({
            top,
            behavior: 'smooth'
          });
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
    <div className='rf-page__content--sections'>
      <div className='rf-page__content-sections'>
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
  );
};

export default PageWithSections;
