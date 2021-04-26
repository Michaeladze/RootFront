import React, { FC } from 'react';
import Button from '../../atoms/Button';
import Close from '../../_icons/close-sm';
import {
  IChips, Size, Variant
} from '../../../types';
import { sizeClass, variantClass } from '../../../utils/helpers';
import './Chips.scss';
export interface IChipsProps {
  items: IChips[];
  className?: string;
  variant?: Variant;
  onClick?: (c: IChips) => void;
  onRemove?: (id: string) => void;
  disabled?: boolean;
  /** Размер */
  size?: Size;
}

const Chips: FC<IChipsProps> = ({
  items, variant = 'base', size = 'medium', onRemove, onClick, className, disabled
}: IChipsProps) => {
  const handleRemove = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    onRemove && onRemove(id);
  };

  const handleClick = (e: React.MouseEvent, c: IChips) => {
    e.preventDefault();
    onClick && onClick(c);
  };

  const chips = items.map((e: IChips) => (
    <div
      className={`rf-chips__item ${variantClass[variant]} ${sizeClass[size]} ${
        disabled || e.disabled ? 'rf-chips__item--disabled' : ''
      } ${className} ${onClick ? 'rf-chips__item--pointer' : ''}`}
      key={e.id}
      onClick={(ev: React.MouseEvent) => handleClick(ev, e)}>
      <span className='rf-chips__name' title={e.name}>
        {e.name.length > 20 ? `${e.name.substr(0, 20)}...` : e.name}
      </span>
      {onRemove && !disabled && !e.disabled && (
        <Button
          className='rf-chips__button'
          buttonType='round'
          disabled={disabled}
          variant={variant}
          onClick={(ev: React.MouseEvent) => handleRemove(ev, e.id)}>
          <Close />
        </Button>
      )}
    </div>
  ));

  return <div className='rf-chips'>{chips}</div>;
};

export default Chips;
