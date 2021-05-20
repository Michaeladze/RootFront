import React, {
  FC, useEffect, useRef, useState
} from 'react';
import './TextEditor.scss';
import ReactQuill from 'react-quill';
import '../../../../styles/Quill.scss';
import Quill from 'quill';
import { variants } from '../../../utils/helpers';
import { Variant } from '../../../types';

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

const TextEditor: FC<IProps> = ({ name, preview, getValue, className = '', defaultValue = '', colors }) => {

  const palettes: number[] = [
    100,
    200,
    300,
    400,
    500,
    600,
    700,
    800,
    900
  ];
  const defaultColors: string[] = palettes.reduce((r: string[], c: number) => {
    variants.forEach((v: Variant) => {
      r.push(`var(--${v}-${c})`);
    });
    return r;
  }, []);

  /** Массив цветов */
  const c = colors || defaultColors;

  /** Модули quill */
  const modules = {
    toolbar: [
      [
        {
          'header': [
            1,
            2,
            3,
            4,
            5,
            6,
            false
          ]
        }
      ],
      [
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote'
      ],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'color': c }, { 'background': c }]
    ]
  };

  /** Форматы quill */
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
    'background',
    'script'
  ];

  // -------------------------------------------------------------------------------------------------------------------

  /** Ссылка на текущий компонент */
  const componentNode = useRef<HTMLDivElement>(null);

  /** Ссылка на input */
  const input = useRef<HTMLInputElement>(null);

  /** Контент */
  const [text, setText] = useState('');

  // -------------------------------------------------------------------------------------------------------------------

  /** Вешаем классс invalid */
  useEffect(() => {
    if (componentNode.current && input.current) {
      const invalid: boolean = input.current.classList.contains('invalid');
      invalid ? componentNode.current.classList.add('invalid') : componentNode.current.classList.remove('invalid');
    }
  });

  // -------------------------------------------------------------------------------------------------------------------

  /** Обработка ввода */
  const handleChange = (e: any, delta: any, source: any, editor: any) => {
    const c = editor.getContents();

    if (input.current) {
      input.current.value = JSON.stringify(c);

      getValue && getValue(c);

      const event = new Event('keyup');
      input.current.dispatchEvent(event);
    }

    setText(e);
  };

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <div className={`rf-text__editor ${className}`} ref={componentNode}>
        <ReactQuill defaultValue={defaultValue ? quillGet(defaultValue).content : text} formats={formats}
          modules={modules}
          onChange={handleChange}/>
        <input className='rf-text__editor-input' ref={input} type='text' name={name}/>
      </div>
      {preview && <div className='rf-editor__preview'>
        <div className='rf-editor__output' dangerouslySetInnerHTML={{ __html: text }}/>
      </div>}
    </>
  );
};

export default TextEditor;

// ---------------------------------------------------------------------------------------------------------------------

/** Конвертируем quill delta в html */
export const quillGet = (inputDelta: string) => {
  const tempCont = document.createElement('div');
  const quill = (new Quill(tempCont));

  let html = inputDelta;
  let text = inputDelta;
  let content = inputDelta;

  try {
    quill.setContents(JSON.parse(inputDelta));
    html = tempCont.getElementsByClassName('ql-editor')[0].innerHTML;

    if (html === '<p><br></p>') {
      html = inputDelta;
    }

    text = quill.getText();
    content = JSON.parse(inputDelta);
  } catch (e) {
    console.log('inputDelta is not a Delta, but a plain text');
  }

  return {
    html,
    text,
    content
  };
};
