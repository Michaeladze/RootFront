import React from 'react';
import './Breadcrumbs.scss';
import Angle from '../../_icons/angle-down';
import { Link } from 'react-router-dom';
import { IBreadcrumb } from '../../../types';

export interface IProps {
  list: IBreadcrumb[];
}

const Breadcrumbs: React.FC<IProps> = ({ list }: IProps) => {
  const listJSX = list.map((b: IBreadcrumb, i: number) => (
    <div className='breadcrumb' key={i}>
      <Link to={b.url} className={`breadcrumb__link ${b.disabled ? 'breadcrumb__link--disabled' : ''}`}>
        {b.label}
      </Link>

      <Angle className='breadcrumb__angle' />
    </div>
  ));

  return <div className='breadcrumbs'>{listJSX}</div>;
};

export default Breadcrumbs;
