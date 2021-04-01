import React, {
  ReactNode, useEffect, useRef
} from 'react';
import { Preloader } from '../../../../index';
import StickyContainer from '../StickyContainer';

interface IProps {
  /** Наполнение */
  children: ReactNode | ReactNode[];
  /** Панель с  фильтрами */
  filters?: ReactNode;
  /** Fixed action menu */
  actionMenu?: ReactNode;
  preloader?: boolean;
}

const PageWithList: React.FC<IProps> = ({ children, filters, actionMenu, preloader = false }: IProps) => {

  /** Ссылка контейнер страницы */
  const listPageRef = useRef<HTMLDivElement>(null);
  /** Ссылка на меню */
  const actionMenuRef = useRef<HTMLDivElement>(null);
  /** Ссылка на разделитель скролла */
  const dividerRef = useRef<HTMLDivElement>(null);
  /** Ссылка на контент */
  const mainRef = useRef<HTMLDivElement>(null);

  /** Прокрутка до отображения разделителя */
  const SHOW_DIVIDER_SCROLL_TOP = 10;
  /** Отступ снизу при прокрутке блока фильтров */
  const FILTERS_OFFSET_SCROLL_BOTTOM = 33;

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
    setTimeout(() => {
      const pageHeader = document.querySelector('.rf-page__header') as HTMLElement;

      if (actionMenuRef.current) {
        if (pageHeader) {
          actionMenuRef.current.style.top = `${pageHeader.offsetHeight}px`;
        }

        if (mainRef.current) {
          mainRef.current.style.paddingTop = `${actionMenuRef.current.offsetHeight}px`;
        }
      }

    });
  }, [actionMenu]);

  const stylesForActionMenu = filters ? {
    width: 'calc(100% - 360px)',
    maxWidth: '1000px',
    left: '336px',
    padding: '0 0 24px 0',
  } : {
    width: 'calc(100% - 48px)',
    maxWidth: '1320px',
    left: '0',
    padding: '0 24px 24px'
  };

  return (
    <div className='rf-page__with-list' ref={listPageRef}>
      {
        preloader ? <Preloader/> : (
          <>
            {filters && (
              <aside className='rf-page__aside-filters'>
                <StickyContainer
                  containerSelector='.rf-page__with-list'
                  top={listPageRef.current ? listPageRef.current.getBoundingClientRect().top : 0}
                  bottom={FILTERS_OFFSET_SCROLL_BOTTOM}
                >

                  <div className='rf-page__aside-filters-inner'>
                    {filters}
                  </div>
                </StickyContainer>
              </aside>
            )}
            <main className='rf-page__main' ref={mainRef}>
              {actionMenu && <div className='rf-page__main-action-menu' style={stylesForActionMenu} ref={actionMenuRef}>
                <div className='rf-page__main-action-menu-inner'>
                  <div className='rf-page__action-menu-divider--list' ref={dividerRef}/>
                  {actionMenu}
                </div>
              </div>}
              <div className='rf-page__main-content'>
                {children}
              </div>
            </main>
          </>
        )
      }
    </div>
  );
};

export default PageWithList;
