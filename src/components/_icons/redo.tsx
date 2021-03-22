import React, { SVGProps } from 'react';

export default (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M9 18H12V16H9C7.346 16 6 14.654 6 13C6 11.346 7.346 10 9 10H15V13L20 9L15 5V8H9C6.243 8 4 10.243 4 13C4 15.757 6.243 18 9 18Z'
        fill='currentColor'/>
    </svg>

  );
};
