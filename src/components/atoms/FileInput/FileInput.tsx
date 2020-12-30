import React, {
  useCallback, useRef, useState
} from 'react';
import {
  compress, getBase64, validateFile
} from '../../../utils/file-utils';
import Chips from '../../molecules/Chips/Chips';
import { IChips, IFileData } from '../../../types';
import Button from '../Button';
import { IButtonProps } from '../Button/Button';
import { sendNotification } from '../../../index';

/**
 * Файловый инпут для небольших файлов, конвертирует файл в base64.
 * Передает в коллбек setFile объект c файлом и его base64 версией { file: File, base64: string }
 *
 */

export interface IFileInputProps extends Omit<IButtonProps, 'onError'> {
  name?: string;
  accept?: string;
  multiple?: boolean;
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  placeholder?: string;
  /** Функция возвращает файл в компонент */
  setFile: (file: IFileData[]) => void;
  /** Коллбек при ошибке */
  onError?: (err: Error) => void;
  /** Максимальный размер - kB */
  maxSize?: number;
  /** Сжать изображения */
  compressImages?: boolean;
}

const FileInput: React.FC<IFileInputProps> = ({
  name = '',
  accept = '*',
  multiple = false,
  className = '',
  defaultValue = '',
  disabled = false,
  placeholder = '',
  setFile,
  onError,
  maxSize,
  compressImages = false,
  ...props
}: IFileInputProps) => {
  /** Файл */
  const [file, uploadFile] = useState<IFileData[]>([]);

  /** Ссылка на инпут */
  const ref = useRef<HTMLInputElement>(null);

  /** Получаем картинку */
  const onChange = () => {
    if (ref.current && ref.current.files) {
      const promises: Promise<IFileData>[] = [];

      Array.from(ref.current.files).forEach((fl: File) => {
        const validationResult = validateFile(fl, {
          maxSize,
          accept
        });

        if (validationResult.valid) {
          promises.push(getBase64(fl));
        } else {
          sendNotification({
            message: validationResult.error,
            variant: 'danger'
          });
          onError && onError(new Error(validationResult.error));
        }
      });

      Promise.all(promises)
        .then((data: IFileData[]) => {
          if (data && ref.current && ref.current.files) {
            const newFiles: IFileData[] = [];

            if (multiple) {
              const keysMap: Record<string, boolean> = {};

              [...file, ...data].forEach((f: IFileData) => {
                if (!keysMap[f.file.name + f.file.lastModified]) {
                  keysMap[f.file.name + f.file.lastModified] = true;
                  newFiles.push(f);
                }
              });
            } else {
              newFiles.push(...data);
            }

            if (compressImages) {
              compress(newFiles)
                .then((compressedFiles: IFileData[]) => {
                  setFile(compressedFiles);
                  uploadFile(compressedFiles);
                })
                .catch(() => {
                  sendNotification({
                    message: 'Не удалось сжать изображение',
                    variant: 'danger'
                  });
                });
            } else {
              setFile(newFiles);
              uploadFile(newFiles);
            }
          }
        })
        .catch((error: Error) => {
          console.log('%c [Ошибка] Не удалось загрузить файл(ы)', 'color: #FF5722');
          console.log(error);
          onError && onError(new Error(`Не удалось загрузить ${multiple ? 'файлы' : 'файл'}`));
        });
    }
  };

  const multipleChips: IChips[] = file.map((f: IFileData) => ({
    id: f.file.name + f.file.lastModified,
    name: f.file.name
  }));

  const onFileRemove = useCallback(
    (id: string) => {
      const files = file.filter((f: IFileData) => f.file.name + f.file.lastModified !== id);
      uploadFile(files);
      setFile(files);
    },
    [file]
  );

  /** Программный клик по инпуту */
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (ref.current) {
      ref.current.click();
    }
  };

  return (
    <div className='file-input__wrapper'>
      <label className={`rf-input ${className || ''}`}>
        <input
          ref={ref}
          type='file'
          name={name}
          className='rf-input__file-hidden'
          defaultValue={defaultValue}
          accept={accept}
          placeholder={placeholder || 'Выберите файл'}
          disabled={disabled}
          onChange={onChange}
          multiple={multiple}
        />
        <Button {...props} type='button' className='file-input__button' onClick={onClick} disabled={disabled}>
          {placeholder}
        </Button>
      </label>

      {file.length > 0 && (
        <div className='file-input__chips'>
          <Chips items={multipleChips} onRemove={multiple ? onFileRemove : undefined} />
        </div>
      )}
    </div>
  );
};

export default FileInput;
