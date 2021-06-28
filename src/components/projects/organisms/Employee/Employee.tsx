import React from 'react';
import './Employee.scss';
import { IUser, TooltipPosition } from '../../../../types/projects.types';
import UserPhoto from '../../atoms/UserPhoto';
import Info from '../../../_icons/info-circle';
import Tooltip from '../../../atoms/Tooltip';
import Structure from '../../atoms/Structure';

export interface IEmployeeProps {
  user: IUser;
  position?: TooltipPosition;
}

const Employee: React.FC<IEmployeeProps> = ({ user, position = 'left' }: IEmployeeProps) => {


  // -------------------------------------------------------------------------------------------------------------------

  const shortDepartment = user.department.slice(0, 60);
  const department = shortDepartment.length < user.department.length ? shortDepartment + '...' : shortDepartment;

  return (
    <div className='rf-employee'>
      <UserPhoto url={ user.photo } fullName={ user.fullName } radius='80px'/>
      <div className='rf-employee__details'>
        <h3 className='rf-employee__name'>{ user.fullName } (ТН { user.id })</h3>
        <div className='rf-employee__info'> { user.position } </div>
        <div className='rf-employee__info rf-employee__info-department'>
          { department }
          {
            user.departmentsPath && (
              <Tooltip position={position} portal>
                <Info className='rf-employee__department-icon'/>
                <Structure departmentsPath={ user.departmentsPath }/>
              </Tooltip>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Employee;
