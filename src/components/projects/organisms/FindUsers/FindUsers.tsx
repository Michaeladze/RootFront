import React, {
  FC, ReactNode, useEffect, useRef, useState
} from 'react';
import Close from '../../../_icons/close-sm';
import Arrow from '../../../_icons/arrow';
import Info from '../../../_icons/info-circle';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

import {
  Button, Checkbox, Input, PopupFooter, Tooltip, UserPhoto, UserStructure
} from '../../../../index';
import Preloader from '../../../atoms/Preloader';
import { IUser } from '../../../../types/projects.types';

/** Подключение модулей*/
SwiperCore.use([Navigation]);

export interface IProps {
  onClose?: () => void;
  /** Список найденных пользователей*/
  searchData?: IUser[];
  /** Список уже выбранных пользователей */
  users?: IUser[];
  /** Функция поиска пользователей */
  onSearch?: (search: string) => void;
  /** Очистка */
  onClear?: () => void;
  /** Вернуть выбранных пользователей в компонент */
  getUsers?: (data: IUser[]) => void;
  /** Дополнительная информация о депортаменте поиска */
  department?: string;
  /** Флаг загрузки */
  loaded: boolean;
  /** Подзаголовок */
  subtitle?: ReactNode;
}

const FindUsers: FC<IProps> = ({
  onClose,
  users = [],
  searchData = [],
  onSearch,
  getUsers,
  onClear,
  department = 'Поиск по всем сотрудникам банка',
  loaded = false,
  subtitle = 'Поиск осуществляется по выбранной компании и в рамках одного подразделения.'
}: IProps) => {

  const inputRef = useRef<HTMLDivElement>(null);

  /** Список выбранных людей */
  const [selectedPeople, setSelectedPeople] = useState<IUser[]>(users);
  const selectedPeopleMap: Record<string, boolean> = selectedPeople.reduce((a: Record<string, boolean>, u: IUser) => {
    a[u.id] = true;
    return a;
  }, {});

  /** Строка поиска */
  const [searchString, setSearchString] = useState<string>('');

  // --------------------------------------------------------------------------------------------------------------------


  // Почему-то спадает фокус при поиске. Возможно из-за перерисовки компонента
  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        const element: HTMLInputElement | null = inputRef.current.querySelector('input');

        if (element) {
          element.focus();
        }
      }
    });
  }, [searchData]);

  // --------------------------------------------------------------------------------------------------------------------

  /** Сбрасываем поиск на старте */
  useEffect(() => {
    onSearch && onSearch('');
  }, []);

  const onSubmit = () => {
    getUsers && getUsers(selectedPeople);
    onClose && onClose();
  };

  const inputHandle = (data: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (data.target as HTMLInputElement).value;
    setSearchString(value);
    onSearch && onSearch(value);
  };

  const addHandle = (item: IUser) => {
    setSelectedPeople([...selectedPeople, item]);
  };

  const removeHandle = (item: IUser) => {
    setSelectedPeople(selectedPeople.filter((data) => item.id !== data.id));
  };

  // --------------------------------------------------------------------------------------------------------------------

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, item: IUser) => {
    if (e.target.checked) {
      addHandle(item);
    } else {
      removeHandle(item);
    }
  };

  // --------------------------------------------------------------------------------------------------------------------

  /** Список найденных сотрудников */
  const listUsers: ReactNode[] = searchData.map((item: IUser) => {

    const label = (
      <div className='list-users__user'>
        <UserPhoto url={item.photo} radius={'48px'} fullName={`${item.firstName} ${item.lastName}`} />
        <div className='list-users__texts-wrapper'>
          <h3 className='list-users__user-name'>
            {`${item.lastName} ${item.firstName} ${item.middleName}`}
            {item.id && <span className='list-users__user-id'>({item.id})</span>}
            {item.departmentsPath && (
              <Tooltip>
                <Info className='list-users__user-info'/>
                <UserStructure user={item}/>
              </Tooltip>
            )}
          </h3>
          <h5 className='list-users__user-position'>{item.department}</h5>
        </div>
      </div>
    );

    return (
      <div className='list-users__wrapper' key={item.id}>
        <Checkbox
          label={label}
          align='center'
          checked={selectedPeopleMap[item.id]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, item)}
        />
      </div>
    );
  });

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
    <div className='find-users__wrapper'>
      <h4 className='find-users__title'>Поиск сотрудников</h4>
      <p className='find-users__notice'>{subtitle}</p>
      <div className='find-users__input-wrapper' ref={inputRef}>
        <Input placeholder='Поиск' search={true} onKeyUp={inputHandle} autoFocus onClear={onClear} />
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
      <PopupFooter textAccept='Добавить' onSubmit={onSubmit} onClose={onClose} />
    </div>
  );
};

export default FindUsers;
