import React, {
  ReactNode, useEffect, useRef
} from 'react';

interface IProps {
  children?: ReactNode | ReactNode[];
  top?: number;
}

const StickyContainer: React.FC<IProps> = ({
  children,
  top
}: IProps) => {


  // -------------------------------------------------------------------------------------------------------------------

  const container = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef<number>(pageYOffset);
  const position = useRef<string>('initial');

  useEffect(() => {

    const onScroll = () => {
      const block = container.current;
      const st = window.pageYOffset || document.documentElement.scrollTop;
      const goingDown = st > lastScrollTop.current;

      if (block) {
        const rect: DOMRect = block.getBoundingClientRect();

        if (goingDown) {
          console.log('Going down');
          console.log(rect.top, rect.height - window.innerHeight);

          // Fix at the bottom
          if (position.current !== 'fixBottom' && rect.top < 0 && rect.top + (rect.height - window.innerHeight) >= 0) {
            block.style.position = 'fixed';
            block.style.top = 'auto';
            block.style.bottom = '0';
            position.current = 'fixBottom';
          }

        } else {
          console.log('Going up');

          // Remove fix at the bottom
          if (position.current === 'fixBottom') {
            block.style.position = 'absolute';
            block.style.bottom = `${pageYOffset + window.innerHeight}px`;
          }

          if (rect.top < 0 && rect.top + (rect.height - window.innerHeight) >= 0) {

          }
        }
      }

      lastScrollTop.current = st <= 0 ? 0 : st;
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className='rf-sticky-container' style={{ top: `${top}px` }} ref={container}>
      {children}
    </div>
  );
};

export default StickyContainer;
