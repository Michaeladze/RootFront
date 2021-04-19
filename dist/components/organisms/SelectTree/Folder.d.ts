import React from 'react';
import { ITreeOption } from '../../../types';
export interface IFolderProps {
    /** Список */
    list: ITreeOption[];
    /** Глубина вложенности */
    depth?: number;
    /** Состояние открыт/закрыт */
    open: boolean;
    /** Родительский элемент */
    parent?: ITreeOption;
    /** Обновление структуры */
    onChange: (f: boolean, o: ITreeOption) => void;
    /** Множественный выбор */
    multiple: boolean;
    /** Активная запись - для единичного выбора */
    activeItem: ITreeOption | undefined;
}
declare const Folder: React.FC<IFolderProps>;
export default Folder;
