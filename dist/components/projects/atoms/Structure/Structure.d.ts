import React from 'react';
import { IStructure } from '../../../../types/projects.types';
interface IProps {
    departmentsPath: IStructure[];
}
import './Structure.scss';
declare const Structure: React.FC<IProps>;
export default Structure;
