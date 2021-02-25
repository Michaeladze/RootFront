import React, {
  FC, ReactNode, useCallback, useEffect, useMemo, useState
} from 'react';
import './Tooltip.scss';


type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

interface ITooltipContentProps {
  rect: DOMRect;
  children: ReactNode | ReactNode[];
  position: TooltipPosition;
  /** Дополнительный класс */
  className?: string;
}

const TooltipContent: FC<ITooltipContentProps> = ({ children, position, className }: ITooltipContentProps) => {
  const div = useMemo<HTMLDivElement>(() => document.createElement('div'), []);

  /** При маунте добавляем модалку. При дестрое - удаляем. */
  useEffect(() => {
    /** Контейнер для модалки */
    document.body.appendChild(div);

    return () => {
      document.body.removeChild(div);
    };
  }, [div]);

  // rect.y = (rect.y || rect.top) + window.scrollY;
  // rect.x = (rect.x || rect.left) + window.scrollX;

  const styles = {
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

  return tooltip;
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
}

const Tooltip: FC<ITooltipProps> = ({
  children,
  position = 'right',
  isVisible = true,
  className = ''
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
        <TooltipContent className={className} position={position} rect={tooltipRect}>
          {children[1]}
        </TooltipContent>
      )}
    </div>
  );
};

export default Tooltip;
