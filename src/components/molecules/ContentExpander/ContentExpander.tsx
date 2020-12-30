import React, { ReactNode, useState } from 'react';
import Angle from '../../_icons/angle-down';

export interface IContentExpanderProps {
  title: ReactNode;
  children: ReactNode | ReactNode[];
  disabled?: boolean;
  defaultValue?: boolean;
  onExpand?: () => void;
  expanded?: boolean;
  className?: string;
}

const ContentExpander: React.FC<IContentExpanderProps> = ({
  title,
  children,
  onExpand,
  expanded,
  defaultValue = false,
  className = '',
  disabled = false
}: IContentExpanderProps) => {
  /** Раскрыть / Скрыть */
  const [innerExpanded, setInnerExpanded] = useState<boolean>(defaultValue);

  const onClick = () => {
    if (disabled) {
      return;
    }

    onExpand ? onExpand() : setInnerExpanded(!innerExpanded);
  };

  const disabledClass = disabled ? 'expander--disabled' : '';

  return (
    <div className={`expander ${className} ${disabledClass}`}>
      <h3 className='expander__title' onClick={onClick}>
        <span className='expander__title-text'>{title}</span>
        <Angle className={`expander__icon ${expanded || innerExpanded ? 'expander__icon--rotate' : ''}`} />
      </h3>

      <div className={`expander__content ${onExpand || innerExpanded ? 'expander__content--active' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default ContentExpander;
