import { useLocation as useLocation1 } from 'react-router-dom';

export interface ILocation extends Location {
  query: { [key: string]: string };
}

export const useLocation = (): ILocation => {
  debugger;
  // @ts-ignore
  const location: ILocation = useLocation1();

  const query = location.search
    .replace('?', '')
    .split('&')
    .reduce((acc: { [key: string]: string }, e: string) => {
      const [k, v]: string[] = e.split('=');
      acc[k] = v;
      return acc;
    }, {});

  location.query = query;

  return location;
};
