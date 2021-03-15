import React, { useEffect, useState } from 'react';

export interface IHeadingData {
    id: string;
    htmlNode: HTMLElement;
}

export interface IUseTableOfContentsProps {
    container: React.RefObject<HTMLElement>;
    /* Селектор для отслеживаемых заголовков/элементов */
    selector: string;
    /* Доп. отступ сверху для активации элемента (помимо отступа контейнера) */
    additionalOffset?: number;
}

export interface IActiveTitle {
  activeTitleId?: string;
  activeIndex: number;
}

const useTableOfContents = ({ container, selector, additionalOffset = 0 }: IUseTableOfContentsProps): IActiveTitle => {
  const [activeTitle, setActiveTitle] = useState<IActiveTitle>({
    activeIndex: 0,
    activeTitleId: undefined
  });
  const [titlesNodes, setTitlesNodes] = useState<IHeadingData[]>([]);

  const parseTitles = () => {
    if (container.current) {
      const htmlNodes: HTMLElement[] = Array.from(container.current.querySelectorAll(selector));

      return htmlNodes.map((node) => ({
        id: node.id,
        htmlNode: node,
      }));
    }

    return [];
  };

  const findActiveNode = () => {
    if (titlesNodes.length && container.current) {

      const wrapper = container.current;
      const offsets = titlesNodes.map((node) => node.htmlNode.getBoundingClientRect().top);

      let activeIndex = offsets.findIndex(offset => {
        return offset > wrapper.offsetTop + additionalOffset;
      });

      /** Активируем последний заголовок если вся страница проскролена */
      if (window.innerHeight + window.pageYOffset >= document.documentElement.offsetHeight) {
        activeIndex = titlesNodes.length - 1;

        setActiveTitle({
          activeTitleId: titlesNodes[activeIndex].id,
          activeIndex
        });

        return;
      }

      if (activeIndex === -1) {
        activeIndex = titlesNodes.length - 1;
      } else if (activeIndex > 0) {
        activeIndex -= 1;
      }

      setActiveTitle({
        activeTitleId: titlesNodes[activeIndex].id,
        activeIndex
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setTitlesNodes(parseTitles());
    });
  }, [selector]);

  useEffect(() => {
    if (!activeTitle.activeTitleId && titlesNodes.length) {
      setActiveTitle({
        activeTitleId: titlesNodes[0].id,
        activeIndex: 0
      });
    }

    window.addEventListener('scroll', findActiveNode);

    return () => {
      window.removeEventListener('scroll', findActiveNode);
    };
  }, [titlesNodes]);


  return activeTitle;
};

export default useTableOfContents;
