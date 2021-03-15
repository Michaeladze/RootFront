import React, { useEffect, useState } from 'react';

export interface IHeadingData {
    id: string;
    htmlNode: HTMLElement;
}

export interface useActiveTableOfContentsProps {
    container: React.RefObject<HTMLElement>;
    /* Селектор для отслеживаемых заголовков/элементов */
    selector: string;
    /* Доп. отступ сверху для активации элемента (помимо отступа контейнера) */
    additionalOffset?: number;
}


const useTableOfContents = ({ container, selector, additionalOffset = 0 }: useActiveTableOfContentsProps): string | undefined => {
  const [activeTitle, setActiveTitle] = useState<string | undefined>(undefined);
  const [titlesNodes, setTitlesNodes] = useState<IHeadingData[]>([]);

  const parseTitles = () => {
    if (container.current) {
      const htmlNodes: HTMLElement[] = Array.from(container.current.querySelectorAll(selector));

      return htmlNodes.map((node) => ({
        value: node.innerText,
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

      /* Активируем последний заголовок если вся страница проскролена */
      if (window.innerHeight + window.pageYOffset >= document.documentElement.offsetHeight) {
        setActiveTitle(titlesNodes[titlesNodes.length - 1].id);
        return;
      }

      if (activeIndex === -1) {
        activeIndex = titlesNodes.length - 1;
      } else if (activeIndex > 0) {
        activeIndex -= 1;
      }

      setActiveTitle(titlesNodes[activeIndex].id);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setTitlesNodes(parseTitles());
    });
  }, [selector]);

  useEffect(() => {
    window.addEventListener('scroll', findActiveNode);

    return () => {
      window.removeEventListener('scroll', findActiveNode);
    };
  }, [titlesNodes]);


  return activeTitle;
};

export default useTableOfContents;
