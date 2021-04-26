import React, {
  ReactElement, ReactNode, useEffect, useState
} from 'react';
import { BehaviorSubject } from 'rxjs';
import Modal from '../../molecules/Modal';
import './PopupMaker.scss';
/** Стак попапов */
export let popups$$ = new BehaviorSubject<ReactNode[]>([]);

/** Закрываем последний открытый попап */
const onClose = (): void => {
  popups$$.next(popups$$.getValue().slice(0, -1));
};

/** Основная функция добавления попапа в стек */
export const openPopup = (component: ReactElement, modalClass = '') => {
  const componentModal: ReactNode = (
    <Modal className={modalClass} key={popups$$.getValue().length} onClose={onClose}>
      {React.cloneElement(component, { onClose }, [])}
    </Modal>
  );
  popups$$.next(popups$$.getValue().concat([componentModal]));
};

const PopupMaker: React.FC = () => {
  const [modalComponent, setModalComponent] = useState<ReactNode[]>([]);

  /** Подписываемся на стек попапов*/
  useEffect(() => {
    if (popups$$.closed) {
      popups$$ = new BehaviorSubject<ReactNode[]>([]);
    }

    popups$$.subscribe((data: ReactNode[]) => {
      setModalComponent(data);
    });
    return () => popups$$.unsubscribe();
  }, []);
  return <>{modalComponent}</>;
};

export default PopupMaker;
