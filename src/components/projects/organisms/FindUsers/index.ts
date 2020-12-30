import FindUsers from './FindUsers';

export default FindUsers;


export interface IUser {
  /** ID пользователя */
  id: string;
  /** Имя пользователя */
  firstName: string;
  /** Фамилия пользователя */
  lastName: string;
  /** Отчество пользователя */
  middleName: string;
  /** Полное имя */
  fullName?: string;
  /** Должность */
  positionName: string;
  /** Должность ID */
  positionId: string;
  /** Департамент */
  department: string;
  /** Департамент ID*/
  departmentId: string;
  /** Структурное подразделение ID*/
  structDepartmentId: string;
  /** Структурное подразделение */
  structDepartmentName: string;
  /** Ссылка на фото */
  photo: string;
}
