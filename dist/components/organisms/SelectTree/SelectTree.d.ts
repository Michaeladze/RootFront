import React from 'react';
import { ITreeOption } from '../../../types';
export interface ITreeProps {
    /** Список */
    list: ITreeOption[];
    /** Состояние открыт/закрыт */
    open?: boolean;
    /** Изменение состояние */
    onChange?: (value: ITreeOption, tree: ITreeOption[]) => void;
    /** Множественный выбор */
    multiple?: boolean;
    /** Активная опция в случае единичного выбора */
    activeOption?: ITreeOption;
}
declare const SelectTree: React.FC<ITreeProps>;
export default SelectTree;
