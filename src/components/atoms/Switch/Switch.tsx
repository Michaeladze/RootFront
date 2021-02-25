import React, {
  FC, ReactNode, useState, useEffect
} from 'react';
import './Switch.scss';
import { Variant } from '../../../types';
import { variantClass } from '../../../utils/helpers';

export interface ISwitchProps {
  onChange?: (f: boolean) => void;
  label?: ReactNode;
  className?: string;
  state?: boolean;
  disable?: boolean;
  variant?: Variant;
}

const Switch: FC<ISwitchProps> = ({
  label,
  className = '',
  state = false,
  disable = false,
  onChange,
  variant = 'accent'
}: ISwitchProps) => {
  const [s, toggle] = useState<boolean>(state);

  useEffect(() => {
    toggle(state);
  }, [state]);

  const changeState = () => {
    if (!disable) {
      onChange && onChange(!s);
      toggle(!s);
    }
  };

  return (
    <div className={`rf-switch ${disable ? 'rf-switch--disable' : ''} ${className}`} onClick={changeState}>
      <div className={`rf-switch__toggle ${s ? 'on' : 'off'} ${variantClass[variant]}`}>
        <div className='rf-switch__circle' />
      </div>
      {label && <p className='rf-switch__label'>{label}</p>}
    </div>
  );
};

export default Switch;
