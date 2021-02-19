import React, { HTMLProps, useRef } from 'react';
import { IOption, Variant } from '../../../types';
import { variantClass } from '../../../utils/helpers';
import { Radio } from '../../../index';


export interface ISegmentProps extends Omit<HTMLProps<HTMLInputElement>, 'list'> {
  /** Список элементов */
  list: IOption[];
  /** Вариант */
  variant?: Variant;
}

const Segment: React.FC<ISegmentProps> = ({
  list,
  className = '',
  variant = 'accent',
  ...props
}: ISegmentProps) => {

  const slider = useRef<HTMLDivElement>(null);
  // -------------------------------------------------------------------------------------------------------------------

  const WIDTH = 141;

  /** Изменение позиции слайдера */
  const onChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    if (slider.current) {

      let x;

      if (i === 0) {
        x = 0;
      } else if (i === list.length - 1) {
        x = -2;
      } else {
        x = -1;
      }

      const width = i !== list.length - 1 ? WIDTH : WIDTH + 1;
      slider.current.style.left = `${(WIDTH * i) + x}px`;
      slider.current.style.width = `${width}px`;
    }

    props.onChange && props.onChange(e);
  };

  // -------------------------------------------------------------------------------------------------------------------

  const radioButtons = list.map((o: IOption, i: number) => (
    <div key={o.value} className='rf-segment__item'>
      <Radio
        {...o}
        variant={variant}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, i)}
        name={props.name || 'defaultSegmentName'}
        checked={props.defaultChecked}
        icon={false}
      />
    </div>
  ));

  return (
    <div className={`rf-segment ${className} ${variantClass[variant]}`}>
      <div className='rf-segment__list'>
        {radioButtons}
      </div>
      <div className='rf-segment__slider' ref={slider}/>
    </div>
  );
};

export default Segment;
