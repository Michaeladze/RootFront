import React, {
  ReactNode, useEffect, useRef
} from 'react';
import { Link } from 'react-router-dom';
import Chevron from '../../../_icons/chevron-left-outline';
import { Tile, UserPhoto } from '../../../../index';
import { IUser } from '../../../../types/projects.types';


export interface IPageProps {
  title?: ReactNode;
  className?: string;
  backUrl?: string;
  children?: ReactNode | ReactNode[];
  user?: IUser;
  sections?: IPageSection[];
}

export interface IPageSection {
  id: string;
  title: ReactNode;
  component: ReactNode;
}

const Page: React.FC<IPageProps> = ({
  title,
  className = '',
  backUrl = '',
  user,
  children,
  sections
}: IPageProps) => {

  // -------------------------------------------------------------------------------------------------------------------

  /** Ссылка на навигацию */
  const asideRef = useRef<HTMLDivElement>(null);
  /** Ссылка на ползунок */
  const sliderRef = useRef<HTMLDivElement>(null);
  /** Ссылка на линию */
  const lineRef = useRef<HTMLDivElement>(null);
  /** Ссылка на страницу */
  const pageRef = useRef<HTMLDivElement>(null);
  /** Ссылка на шапку */
  const headerRef = useRef<HTMLDivElement>(null);
  /** Ссылка на контент */
  const contentRef = useRef<HTMLDivElement>(null);

  // -------------------------------------------------------------------------------------------------------------------

  /** Расчет координаты для Aside */
  useEffect(() => {
    const calculateRightPosition = () => {
      const widthDelta = window.innerWidth - 1368;

      if (asideRef.current) {
        if (headerRef.current) {
          asideRef.current.style.top = `${headerRef.current.offsetHeight}px`;
        }

        if (widthDelta > 0) {
          asideRef.current.style.right = `${(widthDelta / 2) + 40}px`;
        }
      }
    };

    calculateRightPosition();
    window.addEventListener('resize', calculateRightPosition);

    return () => {
      window.removeEventListener('resize', calculateRightPosition);
    };
  }, []);

  /** Расчет отступа сверху для контента */
  useEffect(() => {
    if (headerRef.current && contentRef.current) {
      contentRef.current.style.marginTop = `${headerRef.current.offsetHeight}px`;
    }
  }, []);

  // -------------------------------------------------------------------------------------------------------------------

  /** Изменение координаты слайдера при скролле */
  useEffect(() => {
    if (lineRef.current && sliderRef.current && pageRef.current && headerRef.current) {
      const pageHeight = pageRef.current.offsetHeight + headerRef.current.offsetHeight;
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
      if (contentRef.current) {
        const block = document.getElementById(section.id);

        if (block && headerRef.current) {

          const top = block.getBoundingClientRect().top + pageYOffset - headerRef.current.offsetHeight;
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
    <div className={`rf-page ${className}`} ref={pageRef}>
      <header className='rf-page__header' ref={headerRef}>
        <div className='rf-page__header-inner'>
          {backUrl && <Link to={backUrl} className='rf-page__header-back'>
            <Chevron/>
          </Link>}
          <h2 className='rf-page__title'>{title}</h2>

          <UserPhoto className='rf-page__user' fullName={user?.fullName} radius={'48px'}/>
        </div>
      </header>
      <div className='rf-page__content' ref={contentRef}>
        {children}

        {sections && sections.length > 0 && (
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
        )}
      </div>
    </div>
  );
};

export default Page;
