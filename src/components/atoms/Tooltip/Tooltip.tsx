import React, {
  FC, ReactNode, useCallback, useEffect, useMemo, useState
} from 'react';
import { createPortal } from 'react-dom';
import './Tooltip.scss';

type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

interface ITooltipContentProps {
  rect: DOMRect;
  children: ReactNode | ReactNode[];
  position: TooltipPosition;
  /** Дополнительный класс */
  className?: string;
  portal: boolean;
}

const TooltipContent: FC<ITooltipContentProps> = ({ rect, children, position, className, portal }: ITooltipContentProps) => {
  const div = useMemo<HTMLDivElement>(() => document.createElement('div'), []);

  /** При маунте добавляем модалку. При дестрое - удаляем. */
  useEffect(() => {
    /** Контейнер для модалки */
    document.body.appendChild(div);

    return () => {
      document.body.removeChild(div);
    };
  }, [div]);

  rect.y = (rect.y || rect.top) + window.scrollY;
  rect.x = (rect.x || rect.left) + window.scrollX;

  const styles = portal ?
    {
      top: {
        top: `${rect.y}px`,
        left: `${rect.x + rect.width / 2}px`,
        transform: 'translate(-50%, -100%)'
      },
      right: {
        top: `${rect.y + rect.height / 2}px`,
        left: `${rect.x + rect.width}px`,
        transform: 'translate(0, -50%)'
      },
      bottom: {
        top: `${rect.y + rect.height}px`,
        left: `${rect.x + rect.width / 2}px`,
        transform: 'translate(-50%, 0)'
      },
      left: {
        top: `${rect.y + rect.height / 2}px`,
        left: `${rect.x}px`,
        transform: 'translate(-100%, -50%)'
      }
    } :
    {
      top: {
        top: '0',
        left: '50%',
        transform: 'translate(-50%, -100%)'
      },
      right: {
        top: '50%',
        left: '100%',
        transform: 'translate(0, -50%)'
      },
      bottom: {
        top: '100%',
        left: '50%',
        transform: 'translate(-50%, 0)'
      },
      left: {
        top: '50%',
        left: '0',
        transform: 'translate(-100%, -50%)'
      }
    };

  const padding = {
    top: 'paddingBottom',
    right: 'paddingLeft',
    bottom: 'paddingTop',
    left: 'paddingRight'
  };

  const stopPropagationWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
  };

  const tooltip = (
    <div
      className='rf-tooltip__content-wrapper'
      onWheel={stopPropagationWheel}
      style={{
        ...styles[position],
        [padding[position]]: '8px'
      }}>
      <div className={`rf-tooltip__content ${className}`}>
        <div className={`rf-tooltip__inner rf-tooltip__inner--${position}`}>{children}</div>
      </div>
    </div>
  );

  return portal ? createPortal(tooltip, div) : tooltip;
};

// ---------------------------------------------------------------------------------------------------------------------
/** Основной компонент на экспорт. */
// ---------------------------------------------------------------------------------------------------------------------

export interface ITooltipProps {
  /** [1] Элемент, на который наводим, [2] Элемент с подсказкой */
  children: [ReactNode, ReactNode];
  /** Позиция тултипа */
  position?: TooltipPosition;
  /** Отключить показ самого тултипа */
  isVisible?: boolean;
  /** Дополнительный класс */
  className?: string;
  /** Портал в элемент - по умолчанию body */
  portal?: boolean;
}

const Tooltip: FC<ITooltipProps> = ({
  children,
  position = 'right',
  isVisible = true,
  className = '',
  portal = false
}: ITooltipProps) => {
  const [tooltipRect, setTooltipRect] = useState<DOMRect | null>(null);

  const onScrollElementScroll = useCallback(() => {
    setTooltipRect(null);
  }, []);

  const addListener = (add: boolean) => {
    if (add) {
      window.addEventListener('mousewheel', onScrollElementScroll);
    } else {
      window.removeEventListener('mousewheel', onScrollElementScroll);
    }
  };

  const onMouseEnter = (e: React.MouseEvent) => {
    const child = e.currentTarget.firstElementChild;

    if (child) {
      addListener(true);
      setTooltipRect(child.getBoundingClientRect());
    }
  };

  const onMouseLeave = () => {
    addListener(false);
    setTooltipRect(null);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className='rf-tooltip'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={stopPropagation}
      onMouseUp={stopPropagation}>
      {children[0]}
      {tooltipRect && isVisible && (
        <TooltipContent className={className} position={position} rect={tooltipRect} portal={portal}>
          {children[1]}
        </TooltipContent>
      )}
    </div>
  );
};

export default Tooltip;
