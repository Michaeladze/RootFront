import React, {
  FC, ReactNode, useEffect, useRef, useState
} from 'react';
import './FindUsers.scss';
import '../../../../styles/vendor/Swiper.scss';
import Close from '../../../_icons/close-sm';
import Arrow from '../../../_icons/arrow';
import Info from '../../../_icons/info-circle';
import Icon from './large-search-icon';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

import {
  Button, Checkbox, Input, PopupFooter, Tooltip, UserPhoto, Structure
} from '../../../../index';
import Preloader from '../../../atoms/Preloader';
import { IUser } from '../../../../types/projects.types';
import Axios, {
  AxiosResponse, AxiosStatic, Canceler
} from 'axios';


SwiperCore.use([Navigation]);

export interface IProps {
  onClose?: () => void;
  /** Список уже выбранных пользователей */
  users?: IUser[];
  /** Вернуть выбранных пользователей в компонент */
  getUsers?: (data: IUser[]) => void;
  /** Подзаголовок */
  subtitle?: ReactNode;
  /** Деактивировать выбранных пользователей */
  disableSelected?: boolean;
  /** Множественный выбор */
  multiSelect?: boolean;
  /** Хост запроса */
  host?: string;
  /** Хедерсы запроса */
  headers?: Record<string, string>;
  /** DI Axios */
  AxiosInstance?: AxiosStatic;
}

const FindUsers: FC<IProps> = ({
  onClose,
  users = [],
  disableSelected,
  getUsers,
  multiSelect = true,
  subtitle = 'Поиск осуществляется по выбранной компании и в рамках одного подразделения.',
  host = '',
  headers = {},
  AxiosInstance
}: IProps) => {

  const inputRef = useRef<HTMLDivElement>(null);

  /** Список выбранных людей */
  const [selectedPeople, setSelectedPeople] = useState<IUser[]>(users);
  const selectedPeopleMap: Record<string, boolean> = selectedPeople.reduce((a: Record<string, boolean>, u: IUser) => {
    a[u.id] = true;
    return a;
  }, {});

  const [newPeople, setNewPeople] = useState<IUser[]>([]);
  const newPeopleMap: Record<string, boolean> = newPeople.reduce((a: Record<string, boolean>, u: IUser) => {
    a[u.id] = true;
    return a;
  }, {});

  const disablePeopleMap = useRef<Record<string, boolean>>(selectedPeopleMap);

  /** Строка поиска */
  const [searchString, setSearchString] = useState<string>('');

  // -------------------------------------------------------------------------------------------------------------------

  const [loaded, setLoaded] = useState<boolean>(true);
  const [searchResults, setSearchResults] = useState<IUser[]>([]);

  const cancel = useRef<Canceler | undefined>(undefined);

  const cancelRequest = () => {
    if (cancel.current !== undefined) {
      cancel.current();
    }
  };

  const onSearch = (query: string) => {
    if (query.length < 3) {
      return;
    }

    const uri = `sap/opu/odata4/sap/zhrbc/default/sap/zhrbc_0720_react_utils/0001/IUserSearch?$search=${encodeURIComponent(query)}&$expand=departmentsPath`;

    setLoaded(false);
    const url = `${host}${uri}`;

    const axios = AxiosInstance || Axios;

    cancelRequest();
    axios.get(url, {
      cancelToken: new axios.CancelToken((c: Canceler) => {
        cancel.current = c;
      }),
      headers
    })
      .then(({ data }: AxiosResponse<{ value: IUser[]}>) => {
        setSearchResults(data.value);
        setLoaded(true);
      })
      .catch((_error: any) => {
        setSearchResults([]);
      });
  };

  useEffect(() => {
    return () => {
      cancelRequest();
    };
  }, []);


  const onClear = () => {
    setSearchString('');
    cancelRequest();
  };

  useEffect(() => {
    onSearch(searchString);
  }, [searchString]);


  // -------------------------------------------------------------------------------------------------------------------

  const onSubmit = () => {
    getUsers && getUsers(selectedPeople);
    onClose && onClose();
  };

  const inputHandle = (data: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (data.target as HTMLInputElement).value;
    setSearchString(value);
  };

  const addHandle = (item: IUser) => {
    if (multiSelect) {
      setSelectedPeople([...selectedPeople, item]);

      if (!newPeopleMap[item.id]) {
        setNewPeople([...newPeople, item]);
      }
    } else {
      setSelectedPeople([item]);
    }
  };

  const removeHandle = (item: IUser) => {
    if (multiSelect) {

      setSelectedPeople(selectedPeople.filter((data) => item.id !== data.id));
      setNewPeople(newPeople.filter((data) => item.id !== data.id));

    } else {
      setSelectedPeople([]);
    }
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
  const listUsers: ReactNode[] = searchResults.map((item: IUser) => {

    const label = (
      <div className='list-users__user'>
        <UserPhoto url={ item.photo } radius={ '48px' } fullName={ `${item.firstName} ${item.lastName}` }/>
        <div className='list-users__texts-wrapper'>
          <h3 className='list-users__user-name'>
            { `${item.lastName} ${item.firstName} ${item.middleName}` }
            { item.id && <span className='list-users__user-id'>({ item.id })</span> }
            { item.departmentsPath && (
              <Tooltip portal>
                <Info className='list-users__user-info'/>
                <Structure departmentsPath={ item.departmentsPath }/>
              </Tooltip>
            ) }
          </h3>
          <h5 className='list-users__user-position'>{ item.department }</h5>
        </div>
      </div>
    );

    return (
      <div className='list-users__wrapper' key={ item.id }>
        <Checkbox
          label={ label }
          align='center'
          value={ item.id }
          disabled={ disableSelected && disablePeopleMap.current[item.id] }
          checked={ selectedPeopleMap[item.id] || false }
          onChange={ (e: React.ChangeEvent<HTMLInputElement>) => onChange(e, item) }
        />
      </div>
    );
  });

  // -------------------------------------------------------------------------------------------------------------------

  const placeholder = (placeholder: string) => (
    <div className='search-results__message'>
      <Icon className='search-results__message-icon'/>
      <p className='search-results__message-text'>{ placeholder }</p>
    </div>
  );

  // -------------------------------------------------------------------------------------------------------------------

  /** Выбранные из списка пользователи */
  const listSelectedUsers: ReactNode = selectedPeople.map((item) => (
    <SwiperSlide className='selected_swiper-slide' key={ item.id }>
      <UserPhoto url={ item.photo } radius={ '48px' } fullName={ `${item.firstName} ${item.lastName}` }/>
      <h5 className='selected__text'>{ `${item.lastName}` }</h5>
      <h5 className='selected__text'>{ `${item.firstName}` }</h5>
      { !(disableSelected && disablePeopleMap.current[item.id]) && (
        <Button className='selected__button' onClick={ () => removeHandle(item) } buttonType='round'>
          <Close/>
        </Button>
      ) }
    </SwiperSlide>
  ));

  // -------------------------------------------------------------------------------------------------------------------

  /** Автофокус */
  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        const input: HTMLInputElement | null = inputRef.current.querySelector('.rf-input__field');

        if (input) {
          input.focus();
        }
      }
    });
  }, []);

  // -------------------------------------------------------------------------------------------------------------------

  const disabled = multiSelect ? newPeople.length === 0 : selectedPeople.length === 0;

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className='find-users__wrapper'>
      <h4 className='find-users__title'>Поиск сотрудников</h4>
      <p className='find-users__notice'>{ subtitle }</p>
      <div className='find-users__input-wrapper' ref={ inputRef }>
        <Input placeholder='Поиск' search={ true } onKeyUp={ inputHandle } autoFocus onClear={ onClear }/>
      </div>

      { !!selectedPeople.length && multiSelect && (
        <div className='swiper__container'>
          <div className='swiper__wrapper'>
            <Swiper
              spaceBetween={ 0 }
              slidesPerView={ 'auto' }
              navigation={ {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
              } }>
              { listSelectedUsers }
            </Swiper>
          </div>
          <Button buttonType='round' className='swiper-button-next'>
            <Arrow/>
          </Button>
          <Button buttonType='round' className='swiper-button-prev'>
            <Arrow/>
          </Button>
        </div>
      ) }
      <div className='find-users__list-wrapper'>
        { loaded ? (
          listUsers.length > 0 ? (
            listUsers
          ) : (
            searchString === '' ? placeholder('Начните поиск') : placeholder('Нет результатов для отображения. Измените запрос.')
          )
        ) : <Preloader/> }
      </div>
      <PopupFooter textAccept='Добавить' onSubmit={ onSubmit } disabled={disabled} onClose={ onClose }/>
    </div>
  );
};

export default FindUsers;
