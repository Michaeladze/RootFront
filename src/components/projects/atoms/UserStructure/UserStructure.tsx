import React from 'react';
import { IUser, IUserStructure } from '../../../../types/projects.types';

interface IProps {
    user: IUser
}

const UserStructure: React.FC<IProps> = ({ user }: IProps) => {

  const departmentsPath = user.departmentsPath || [];

  const departmentsPathJSX = departmentsPath.map((item: IUserStructure) => (
    <div key={item.id} className='user-structure__item'>
      <h4 className='user-structure__unit'>{item.unitTypeDesc}</h4>
      <p className='user-structure__name'>{item.name}</p>
    </div>
  ));

  // -------------------------------------------------------------------------------------------------------------------


  return (
    <div className='user-structure'>
      {departmentsPathJSX}
    </div>
  );
};

export default UserStructure;
