export function resizeSensor(element: HTMLElement, callback: () => void) {
  let zIndex = +getComputedStyle(element).zIndex;

  if (isNaN(zIndex)) {
    zIndex = 0;
  }


  zIndex--;

  const expand = document.createElement('div');
  expand.style.position = 'absolute';
  expand.style.left = '0px';
  expand.style.top = '0px';
  expand.style.right = '0px';
  expand.style.bottom = '0px';
  expand.style.overflow = 'hidden';
  expand.style.zIndex = zIndex.toString();
  expand.style.visibility = 'hidden';

  const expandChild = document.createElement('div');
  expandChild.style.position = 'absolute';
  expandChild.style.left = '0px';
  expandChild.style.top = '0px';
  expandChild.style.width = '10000000px';
  expandChild.style.height = '10000000px';
  expand.appendChild(expandChild);

  const shrink = document.createElement('div');
  shrink.style.position = 'absolute';
  shrink.style.left = '0px';
  shrink.style.top = '0px';
  shrink.style.right = '0px';
  shrink.style.bottom = '0px';
  shrink.style.overflow = 'hidden';
  shrink.style.zIndex = zIndex.toString();
  shrink.style.visibility = 'hidden';

  const shrinkChild = document.createElement('div');
  shrinkChild.style.position = 'absolute';
  shrinkChild.style.left = '0px';
  shrinkChild.style.top = '0px';
  shrinkChild.style.width = '200%';
  shrinkChild.style.height = '200%';
  shrink.appendChild(shrinkChild);

  element.appendChild(expand);
  element.appendChild(shrink);

  function setScroll() {
    expand.scrollLeft = 10000000;
    expand.scrollTop = 10000000;

    shrink.scrollLeft = 10000000;
    shrink.scrollTop = 10000000;
  }
  setScroll();

  const size = element.getBoundingClientRect();

  let currentWidth = size.width;
  let currentHeight = size.height;

  const onScroll = function() {
    const size = element.getBoundingClientRect();

    const newWidth = size.width;
    const newHeight = size.height;

    if (newWidth !== currentWidth || newHeight !== currentHeight) {
      currentWidth = newWidth;
      currentHeight = newHeight;

      callback();
    }

    setScroll();
  };

  expand.addEventListener('scroll', onScroll);
  shrink.addEventListener('scroll', onScroll);
}
