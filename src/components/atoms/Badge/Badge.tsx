import React, {
  ReactNode, useLayoutEffect, useRef, useState
} from 'react';
import './Badge.scss';
import { Variant } from '../../../types';
import { variantClass } from '../../../utils/helpers';

export interface IBadgeProps {
  children: ReactNode;
  badgeContent?: ReactNode;
  className?: string;
  variant?: Variant;
  max?: number;
  position?: 'topRight' | 'topLeft' | 'bottomLeft' | 'bottomRight' | 'text';
  display?: boolean;
}

type Coordinates = { top: number; right: number };

const Badge: React.FC<IBadgeProps> = ({
  badgeContent,
  children,
  className = '',
  variant = 'base',
  max = 99,
  position = 'topRight',
  display = true
}: IBadgeProps) => {
  const wrapper = useRef<HTMLDivElement>(null);

  const isDot = badgeContent ? '' : 'rf-badge--dot';
  const [coordinates, setCoordinates] = useState<Coordinates>({
    top: 0,
    right: 0
  });

  useLayoutEffect(() => {
    if (badgeContent) {
      return;
    }

    const child = wrapper.current?.firstElementChild;

    if (child) {
      const w = child.clientWidth;

      const kX = Math.cos(Math.PI / 3);
      const kY = Math.sin(Math.PI / 3);
      const badgeR = 4;

      const coordinates: Record<string, Coordinates> = {
        bottomRight: {
          top: w / 2 * (kY + 1) - badgeR,
          right: w / 2 * (1 - kX) - badgeR
        },
        bottomLeft: {
          top: w / 2 * (kY + 1) - badgeR,
          right: w / 2 * (kX + 1) + badgeR
        },
        topLeft: {
          top: w / 2 * (1 - kY) + badgeR,
          right: w / 2 * (kX + 1) + badgeR
        },
        topRight: {
          top: w / 2 * (1 - kY) + badgeR,
          right: w / 2 * (1 - kX) - badgeR
        }
      };

      setCoordinates(coordinates[position]);
    }
  }, [children, badgeContent]);
  // -------------------------------------------------------------------------------------------------------------------

  const textClass = typeof children === 'string' || position === 'text' ? 'rf-badge--text' : '';

  return (
    <div className={`rf-badge__wrapper ${className}`} ref={wrapper}>
      {children}
      {display &&
        <div className={`rf-badge ${variantClass[variant]} ${isDot} ${textClass}`} style={coordinates}>
          {badgeContent ? !isNaN(+badgeContent) && +badgeContent > max ? `${max}+` : badgeContent : null}
        </div>
      }
    </div>
  );
};

export default Badge;
