import React, { SVGProps } from 'react';

export default (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M5 21H19C20.103 21 21 20.103 21 19V8C21 7.735 20.895 7.48 20.707 7.293L16.707 3.293C16.52 3.105 16.266 3 16 3H5C3.897 3 3 3.897 3 5V19C3 20.103 3.897 21 5 21ZM15 19H9V14H15V19ZM13 7H11V5H13V7ZM5 5H7V9H9H11H13H14H15V5H15.586L19 8.414L19.001 19H17V14C17 12.897 16.103 12 15 12H9C7.897 12 7 12.897 7 14V19H5V5Z'
        fill='currentColor'/>
    </svg>

  );
};
