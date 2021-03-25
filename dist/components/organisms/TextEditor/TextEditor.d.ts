import { FC } from 'react';
import 'react-quill/dist/quill.snow.css';
export interface IProps {
    /** Атрибут name */
    name: string;
    /** Значение по умолчанию */
    defaultValue?: string;
    /** Класс */
    className?: string;
    /** Предпросмотр */
    preview?: boolean;
    /** Функция возвращает текущее значение */
    getValue?: (v: any) => void;
    /** Цвета */
    colors?: string[];
}
declare const TextEditor: FC<IProps>;
export default TextEditor;
/** Конвертируем quill delta в html */
export declare const quillGet: (inputDelta: string) => {
    html: string;
    text: string;
    content: string;
};
