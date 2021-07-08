import React, { SVGProps } from 'react';

export default (props: SVGProps<SVGSVGElement>) =>
  <svg width='80' height='80' viewBox='0 0 80 80' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <circle cx='40' cy='40' r='40' fill='#E5E7EB'/>
    <path fill-rule='evenodd' clip-rule='evenodd' d='M26.5858 26.5858C27.3668 25.8047 28.6332 25.8047 29.4142 26.5858L53.4142 50.5858C54.1953 51.3668 54.1953 52.6332 53.4142 53.4142C52.6332 54.1953 51.3668 54.1953 50.5858 53.4142L26.5858 29.4142C25.8047 28.6332 25.8047 27.3668 26.5858 26.5858Z' fill='#9A9EA5'/>
    <path fill-rule='evenodd' clip-rule='evenodd' d='M53.4142 26.5858C54.1953 27.3668 54.1953 28.6332 53.4142 29.4142L29.4142 53.4142C28.6332 54.1953 27.3668 54.1953 26.5858 53.4142C25.8047 52.6332 25.8047 51.3668 26.5858 50.5858L50.5858 26.5858C51.3668 25.8047 52.6332 25.8047 53.4142 26.5858Z' fill='#9A9EA5'/>
  </svg>;
