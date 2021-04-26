import React, {
  ReactNode, useEffect, useRef
} from 'react';
// @ts-ignore
import StickySidebar from 'sticky-sidebar-v2';
import { install } from 'resize-observer';
import './StickyContainer.scss';
interface IProps {
  containerSelector: string;
  /** Контейнер со сроллом, по-умолчанию = window */
  scrollContainer?: string;
  children?: ReactNode | ReactNode[];
  top?: number;
  bottom?: number;
}

const StickyContainer: React.FC<IProps> = ({
  containerSelector, scrollContainer,
  children,
  top = 0,
  bottom = 0
}: IProps) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let sidebar: any;

    if (container.current) {
      /** IE 11 polyfill - всегда переопределяет ResizeObserver, поэтому сначала проверка */
      if (!window.ResizeObserver) {
        install();
      }

      /** https://blixhavn.github.io/sticky-sidebar-v2/ */
      sidebar = new StickySidebar('.rf-sticky-container', {
        containerSelector,
        scrollContainer,
        innerWrapperSelector: '.rf-sticky-element',
        topSpacing: top,
        bottomSpacing: bottom
      });

    }

    return () => {
      sidebar.destroy();
    };
  }, [top, bottom]);

  return (
    <div className='rf-sticky-container' ref={container}>
      <div className='rf-sticky-element'>
        {children}
      </div>
    </div>
  );
};

export default StickyContainer;
