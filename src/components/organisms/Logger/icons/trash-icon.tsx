import React, { SVGProps } from 'react';

export default (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width='24' height='25' viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M5.00299 20.5C5.00299 21.603 5.89999 22.5 7.00299 22.5H17.003C18.106 22.5 19.003 21.603 19.003 20.5V8.5H21.003V6.5H18.003H17.003V4.5C17.003 3.397 16.106 2.5 15.003 2.5H9.00299C7.89999 2.5 7.00299 3.397 7.00299 4.5V6.5H6.00299H3.00299V8.5H5.00299V20.5ZM9.00299 4.5H15.003V6.5H9.00299V4.5ZM8.00299 8.5H16.003H17.003L17.004 20.5H7.00299V8.5H8.00299Z'
        fill='currentColor'/>
      <path d='M9.00299 10.5H11.003V18.5H9.00299V10.5ZM13.003 10.5H15.003V18.5H13.003V10.5Z' fill='currentColor'/>
    </svg>

  );
};
