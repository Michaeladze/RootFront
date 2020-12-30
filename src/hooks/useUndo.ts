import {
  useCallback, useEffect, useState
} from 'react';

export const deepCopy = (obj: any) => {
  return obj ? JSON.parse(JSON.stringify(obj)) : obj;
};

export interface IUseUndo {
  state: any;
  capacity?: number;
}

export const useUndo = (config: IUseUndo) => {
  const UNDO_CAPACITY = config.capacity || 20;

  const [state, setState] = useState<any>(config.state);

  /** Undo */
  const [undo, setUndo] = useState<any[]>([]);

  const pushUndo = (nextState: any, fromRedo?: boolean) => {
    if (!fromRedo) {
      setRedo([]);
    }

    if (undo.length === UNDO_CAPACITY) {
      undo.shift();
    }

    setUndo((l: any[]) => [...l, deepCopy(state)]);
    setState(nextState);
  };

  /** Redo */
  const [redo, setRedo] = useState<any[]>([]);

  const pushRedo = (state: any) => {
    setRedo((l: any[]) => [...l, deepCopy(state)]);
  };

  const dispatchUndo = (): any => {
    const s: any = undo.pop();

    if (s) {
      pushRedo(state);
      setState(s);
    }
  };

  const dispatchRedo = () => {
    const s: any = redo.pop();

    if (s) {
      pushUndo(state, true);
      setState(s);
    }
  };

  useEffect(() => {
    const onUndo = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.key === 'Meta') && e.code === 'KeyZ') {
        e.shiftKey ? dispatchRedo() : dispatchUndo();
      }
    };

    window.addEventListener('keypress', onUndo);
    return () => {
      window.removeEventListener('keypress', onUndo);
    };
  }, [dispatchRedo, dispatchUndo]);

  /** Сбросить */
  const reset = useCallback(
    (nextState?: any) => {
      pushUndo(deepCopy(state));
      nextState && setState(deepCopy(nextState));
      setRedo([]);
    },
    [state]
  );

  return {
    undo,
    redo,
    state,
    pushUndo,
    dispatchUndo,
    dispatchRedo,
    reset
  };
};
