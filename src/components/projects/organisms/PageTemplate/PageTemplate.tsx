import React, { ReactNode } from 'react';
import './PageTemplate.scss';
import Angle from '../../../_icons/angle-down';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../molecules/Breadcrumbs';

import Button from '../../../atoms/Button';
import Container from '../../../atoms/Container';
import { IBreadcrumb } from '../../../../types';

export interface IProps {
  /** Название*/
  title: ReactNode;
  /** Путь */
  breadcrumbs?: IBreadcrumb[];
  /** Ссылка на предыдущую страницу*/
  backUrl?: string;
  /** Спрятать все кнопки */
  onlyTitle?: boolean;
  /** Класс */
  className?: string;
  /** Наполнение */
  children: ReactNode | ReactNode[];
}

const PageTemplate: React.FC<IProps> = ({
  title,
  breadcrumbs,
  children,
  backUrl = '/',
  className = '',
  onlyTitle = false
}: IProps) => {
  return (
    <div className={`page-template ${className}`}>
      <div className='page-template__underlay' />
      <Container>
        <div className='page-template__content-wrapper'>
          <header className='page-template__header'>
            <div className='page-template__header-row'>
              {!onlyTitle && (
                <Link to={backUrl}>
                  <Button buttonType='round' className='page-template__header-back'>
                    <Angle className='page-template__header-icon' />
                  </Button>
                </Link>
              )}
              <h2 className='page-template__title'>{title}</h2>
            </div>

            {!onlyTitle && breadcrumbs && <Breadcrumbs list={breadcrumbs} />}
          </header>

          <div className='page-template__content'>{children}</div>
        </div>
      </Container>
    </div>
  );
};

export default PageTemplate;
