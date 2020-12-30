import React, { FC } from 'react';

export interface IFormGroupInlineProps {
  /** Дочерние элементы */
  children: React.ReactNode | React.ReactNode[];
  /** Имя */
  label?: React.ReactNode;
  /** Сообщение об ошибке */
  errorMessage?: string;
  /** Дополнительный класс */
  className?: string;
  /** Обязательность */
  required?: boolean;
}

const FormGroupInline: FC<IFormGroupInlineProps> = ({
  children,
  className,
  errorMessage,
  label,
  required
}: IFormGroupInlineProps) => {
  return (
    <div className={`rf-inline-group ${className}`}>
      <div className='rf-inline-group__inner'>
        {label && (
          <p className='rf-inline-group__label'>
            {label} {required && <span className='rf-inline-group__required'>*</span>}
          </p>
        )}
        {children}
      </div>
      {errorMessage && <p className='rf-inline-group__message'>{errorMessage}</p>}
    </div>
  );
};

export default FormGroupInline;
