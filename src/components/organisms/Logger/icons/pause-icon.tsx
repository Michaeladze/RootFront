import React, { SVGProps } from 'react';

export default (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width='24' height='25' viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M12 2.5C6.486 2.5 2 6.986 2 12.5C2 18.014 6.486 22.5 12 22.5C17.514 22.5 22 18.014 22 12.5C22 6.986 17.514 2.5 12 2.5ZM12 20.5C7.589 20.5 4 16.911 4 12.5C4 8.089 7.589 4.5 12 4.5C16.411 4.5 20 8.089 20 12.5C20 16.911 16.411 20.5 12 20.5Z'
        fill='currentColor'/>
      <path d='M13 9.5H15V15.5H13V9.5ZM9 9.5H11V15.5H9V9.5Z' fill='currentColor'/>
    </svg>
  );
};
