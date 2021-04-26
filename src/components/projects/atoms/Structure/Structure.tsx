import React from 'react';
import { IStructure } from '../../../../types/projects.types';

interface IProps {
    departmentsPath: IStructure[]
}
import './Structure.scss';
const Structure: React.FC<IProps> = ({ departmentsPath = [] }: IProps) => {

  const departmentsPathJSX = departmentsPath.map((item: IStructure) => (
    <div key={item.id} className='structure__item'>
      <h4 className='structure__unit'>{item.unitTypeDesc}</h4>
      <p className='structure__name'>{item.name}</p>
    </div>
  ));

  // -------------------------------------------------------------------------------------------------------------------


  return (
    <div className='structure'>
      {departmentsPathJSX}
    </div>
  );
};

export default Structure;
