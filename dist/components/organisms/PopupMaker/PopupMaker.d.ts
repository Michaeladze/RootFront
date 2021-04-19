import React, { ReactElement } from 'react';
import { BehaviorSubject } from 'rxjs';
/** Стак попапов */
export declare let popups$$: BehaviorSubject<React.ReactNode[]>;
/** Основная функция добавления попапа в стек */
export declare const openPopup: (component: ReactElement, modalClass?: string) => void;
declare const PopupMaker: React.FC;
export default PopupMaker;
