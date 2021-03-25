export interface ILocation extends Location {
    query: {
        [key: string]: string;
    };
}
export declare const useLocation: () => ILocation;
