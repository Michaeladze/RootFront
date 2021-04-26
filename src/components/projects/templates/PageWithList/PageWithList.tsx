import React, {
  ReactNode, useEffect, useRef, useState
} from 'react';
import './PageWithList.scss';
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
  const [listPageRef, setNode] = useState<HTMLDivElement | null>(null);
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
  /** Горизонтальный паддинг ActionMenu */
  const ACTION_MENU_PADDING = 16;

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

  /** Расчет координаты для Aside */
  useEffect(() => {
    const calculatePosition = () => {
      const pageHeader = document.querySelector('.rf-page__header') as HTMLElement;

      if (actionMenuRef.current) {
        if (pageHeader) {
          actionMenuRef.current.style.top = `${pageHeader.offsetHeight}px`;
        }

        if (mainRef.current) {
          mainRef.current.style.paddingTop = `${actionMenuRef.current.offsetHeight}px`;
          actionMenuRef.current.style.left = mainRef.current.getBoundingClientRect().left - ACTION_MENU_PADDING + 'px';
          actionMenuRef.current.style.width = mainRef.current.getBoundingClientRect().width + 'px';
        }
      }
    };

    setTimeout(() => {
      calculatePosition();
    });
    window.addEventListener('resize', calculatePosition);

    return () => {
      window.removeEventListener('resize', calculatePosition);
    };
  }, [actionMenu]);

  const [top, setTop] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (listPageRef) {
        setTop(listPageRef.getBoundingClientRect().top);
      }
    });
  }, [listPageRef]);

  const stylesForActionMenu = filters ? { maxWidth: '1000px' } : { maxWidth: '1320px' };
  const actionMenuHideClass = actionMenu ? '' : 'rf-page__main-action-menu--hidden';
  const noFiltersAndMenuClass = !actionMenu && !filters ? 'rf-page__main-action-menu--no-filters' : '';

  return (
    <div className='rf-page__with-list' ref={(node) => setNode(node)}>
      {
        preloader ? <Preloader/> : (
          <>
            {filters && (
              <aside className='rf-page__aside-filters'>
                <StickyContainer
                  containerSelector='.rf-page__with-list'
                  top={top}
                  bottom={FILTERS_OFFSET_SCROLL_BOTTOM}
                >

                  <div className='rf-page__aside-filters-inner'>
                    {filters}
                  </div>
                </StickyContainer>
              </aside>
            )}
            <main className='rf-page__main' ref={mainRef}>
              <div className={`rf-page__main-action-menu ${actionMenuHideClass} ${noFiltersAndMenuClass}`}
                style={stylesForActionMenu} ref={actionMenuRef}>
                <div className='rf-page__main-action-menu-inner'>
                  <div className='rf-page__action-menu-divider--list' ref={dividerRef}/>
                  {actionMenu && actionMenu}
                </div>
              </div>
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
