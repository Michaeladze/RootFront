import React, {
  FC, ReactNode, useEffect, useState
} from 'react';
import Plus from '../../../_icons/plus';
import Check from '../../../_icons/check';
import Close from '../../../_icons/close';
import Arrow from '../../../_icons/arrow';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

import {
  Button, Input, PopupFooter, UserPhoto
} from '../../../../index';
import { IUser } from './index';
import Preloader from '../../../atoms/Preloader';

/** Подключение модулей*/
SwiperCore.use([Navigation]);

export interface IProps {
  onClose?: () => void;
  /** Список найденных пользователей*/
  searchData?: IUser[];
  /** Список уже выбранных пользователей */
  users?: IUser[];
  /** Функция поиска пользователей */
  onSearch?: (search: string, department: string) => void;
  /** Вернуть выбранных пользователей в компонент */
  getUsers?: (data: IUser[]) => void;
  /** Дополнительная информация о депортаменте поиска */
  department?: string;
  /** Флаг загрузки */
  loaded: boolean;
}

const FindUsers: FC<IProps> = ({
  onClose,
  users = [],
  searchData = [],
  onSearch,
  getUsers,
  department = 'Поиск по всем сотрудникам банка',
  loaded = false
}: IProps) => {
  /** Список выбранных людей */
  const [selectedPeople, setSelectedPeople] = useState<IUser[]>(users);
  const idSelectedPeople = selectedPeople.map((u: IUser) => u.id);
  /** Текущие результаты поиска */
  const [searchString, setSearchString] = useState<string>('');

  // --------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    console.log(selectedPeople);
    onSearch && onSearch('', selectedPeople.length ? selectedPeople[0].structDepartmentId : '');
  }, []);

  const onSubmit = () => {
    // E.preventDefault();
    onClose && onClose();
    getUsers && getUsers(selectedPeople);
  };

  const inputHandle = (data: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (data.target as HTMLInputElement).value;
    setSearchString(value);
    onSearch && onSearch(value, selectedPeople.length ? selectedPeople[0].structDepartmentId : '');
  };

  const addHandle = (item: IUser) => {
    setSelectedPeople(selectedPeople.concat([item]));
  };

  const removeHandle = (item: IUser) => {
    setSelectedPeople(selectedPeople.filter((data) => item.id !== data.id));
  };

  // --------------------------------------------------------------------------------------------------------------------

  /** Кнопки добавить / удалить */

  const buttonAdd = (item: IUser) => (
    <Button className='list-users__button-add' onClick={() => addHandle(item)} buttonType='round'>
      <Plus />
    </Button>
  );

  const buttonCheck = (item: IUser) => (
    <Button className='list-users__button-check' onClick={() => removeHandle(item)} buttonType='round'>
      <Check />
    </Button>
  );

  // --------------------------------------------------------------------------------------------------------------------

  /** Список найденных сотрудников */
  const listUsers: ReactNode[] = searchData
    .filter((item: IUser) => {
      if (!selectedPeople.length) {
        return true;
      }

      return item.structDepartmentId === selectedPeople[0].structDepartmentId;
    })
    .map((item: IUser) => (
      <div className='list-users__wrapper' key={item.id}>
        <UserPhoto url={item.photo} radius={'48px'} fullName={`${item.firstName} ${item.lastName}`} />
        <div className='list-users__texts-wrapper'>
          <h3 className='list-users__user-name'>{`${item.lastName} ${item.firstName} ${item.middleName}`}</h3>
          <h5 className='list-users__user-position'>{item.department}</h5>
        </div>
        {idSelectedPeople.includes(item.id) ? buttonCheck(item) : buttonAdd(item)}
      </div>
    ));

  // --------------------------------------------------------------------------------------------------------------------

  /** Выбранные из списка пользователи */
  const listSelectedUsers: ReactNode = selectedPeople.map((item) => (
    <SwiperSlide className='selected_swiper-slide' key={item.id}>
      <UserPhoto url={item.photo} radius={'48px'} fullName={`${item.firstName} ${item.lastName}`} />
      <h5 className='selected__text'>{`${item.lastName}`}</h5>
      <h5 className='selected__text'>{`${item.firstName}`}</h5>
      <Button className='selected__button' onClick={() => removeHandle(item)} buttonType='round'>
        <Close />
      </Button>
    </SwiperSlide>
  ));

  // --------------------------------------------------------------------------------------------------------------------

  return (
    <form className='find-users__wrapper'>
      <h4 className='find-users__title'>Поиск сотрудников</h4>
      <p className='find-users__notice'>Поиск осуществляется по выбранной компании и в рамках одного подразделения.</p>
      <div className='find-users__input-wrapper'>
        <Input className='find-users__input' placeholder='Поиск' search={true} onKeyUp={inputHandle} />
      </div>

      {!!selectedPeople.length && (
        <div className='swiper__container'>
          <div className='swiper__wrapper'>
            <Swiper
              spaceBetween={0}
              slidesPerView={'auto'}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
              }}>
              {listSelectedUsers}
            </Swiper>
          </div>
          <Button buttonType='round' className='swiper-button-next'>
            <Arrow />
          </Button>
          <Button buttonType='round' className='swiper-button-prev'>
            <Arrow />
          </Button>
        </div>
      )}
      <h6 className='find-users__subtitle'>
        {selectedPeople.length ? selectedPeople[0].structDepartmentName : department}
      </h6>
      <div className='find-users__list-wrapper'>
        {loaded ? (
          searchString === '' || listUsers.length > 0 ? (
            listUsers
          ) : (
            <span className='find-users__message'>Ничего не найдено</span>
          )
        ) : (
          <Preloader />
        )}
      </div>
      <PopupFooter textAccept='Добавить' onSubmit={onSubmit} />
    </form>
  );
};

export default FindUsers;
