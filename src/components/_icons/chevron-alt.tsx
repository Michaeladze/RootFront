import React, { SVGProps } from 'react';

export default (props: SVGProps<SVGSVGElement>) => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' { ...props }>
    <path fillRule='evenodd' clipRule='evenodd'
      d='M15.6783 19.2348C16.0841 18.8602 16.1094 18.2275 15.7348 17.8217L10.3609 12L15.7348 6.17828C16.1094 5.77246 16.0841 5.1398 15.6783 4.76519C15.2725 4.39059 14.6398 4.4159 14.2652 4.82172L8.2652 11.3217C7.9116 11.7048 7.9116 12.2952 8.2652 12.6783L14.2652 19.1783C14.6398 19.5841 15.2725 19.6094 15.6783 19.2348Z'
      fill='currentColor'/>
  </svg>
);
