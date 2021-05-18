import React, { SVGProps } from 'react';

export default (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width='24' height='25' viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path d='M19 9.5H15V3.5H9V9.5H5L12 17.5L19 9.5ZM4 19.5H20V21.5H4V19.5Z' fill='currentColor'/>
    </svg>
  );
};
