export declare const deepCopy: (obj: any) => any;
export interface IUseUndo {
    state: any;
    capacity?: number;
}
export declare const useUndo: (config: IUseUndo) => {
    undo: any[];
    redo: any[];
    state: any;
    pushUndo: (nextState: any, fromRedo?: boolean | undefined) => void;
    dispatchUndo: () => any;
    dispatchRedo: () => void;
    reset: (nextState?: any) => void;
};
