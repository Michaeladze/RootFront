import { FC, HTMLProps } from 'react';
export interface ITextareaProps extends HTMLProps<HTMLTextAreaElement> {
    /** Автоматическое изменение высоты */
    autoResize?: boolean;
    /** Количество строк */
    initialRowCount?: number;
    /** Последовательность перехода при нажатии на Tab */
    tabIndex?: number;
    /** Дебаунс */
    debounce?: number;
    /** Вернуть value */
    getValue?: (value: string) => void;
}
declare const Textarea: FC<ITextareaProps>;
export default Textarea;
