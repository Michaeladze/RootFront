declare module '*.svg?inline' {
  const content: any;
  export default content;
}

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}
