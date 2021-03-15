import React, {
  ReactNode, useEffect, useRef
} from 'react';


interface IProps {
  /** Наполнение */
  children: ReactNode | ReactNode[];
  /** Панель с  фильтрами */
  filters?: ReactNode;
  /** Fixed action menu */
  actionMenu?: ReactNode;
}

const PageWithList: React.FC<IProps> = ({ children, filters, actionMenu }: IProps) => {

  /** Ссылка на меню */
  const actionMenuRef = useRef<HTMLDivElement>(null);
  /** Ссылка на разделитель скролла */
  const dividerRef = useRef<HTMLDivElement>(null);

  /** Прокрутка до отображения разделителя */
  const SHOW_DIVIDER_SCROLL_TOP = 10;

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

      if (actionMenuRef.current && pageHeader) {
        actionMenuRef.current.style.top = `${pageHeader.offsetHeight}px`;
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
    <div className='rf-page__with-list'>
      {filters && (
        <aside className='rf-page__aside-filters'>
          <div className='rf-page__aside-filters-inner'>
            {filters}
          </div>
        </aside>
      )}
      <main className='rf-page__main'>
        <div className='rf-page__main-action-menu' style={stylesForActionMenu} ref={actionMenuRef}>
          <div className='rf-page__main-action-menu-inner'>
            <div className='rf-page__action-menu-divider--list' ref={dividerRef}/>
            {actionMenu}
          </div>
        </div>
        <div className='rf-page__main-content'>
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageWithList;