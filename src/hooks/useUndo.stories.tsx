import React, { CSSProperties } from 'react';
import { Button } from '../index';
import { useUndo } from './useUndo';

export default { title: 'Hooks/useUndo' };

export const useUndoHook = () => {
  const config = {
    state: {
      a: 1,
      b: 1
    }
  };

  const {
    undo, redo, pushUndo, dispatchUndo, dispatchRedo, reset, state
  } = useUndo(config);

  const incrementA = () => {
    pushUndo({
      ...state,
      a: state.a + 1
    });
  };

  const incrementB = () => {
    pushUndo({
      ...state,
      b: state.b + 1
    });
  };

  const style: CSSProperties = {
    marginRight: '20px',
    userSelect: 'none'
  };

  return (
    <div>
      <Button style={style} onClick={incrementA}>
        Increment A
      </Button>
      <Button style={style} onClick={incrementB}>
        Increment B
      </Button>
      <Button style={style} onClick={dispatchUndo} disabled={undo.length === 0}>
        Undo
      </Button>
      <Button style={style} onClick={dispatchRedo} disabled={redo.length === 0}>
        Redo
      </Button>
      <Button style={style} onClick={() => reset({
        a: 1,
        b: 1
      })}>
        Reset
      </Button>

      <div style={{ marginTop: '20px' }}>
        <div>
          <span>A = </span>
          <span>{state.a}</span>
        </div>
        <div>
          <span>B = </span>
          <span>{state.b}</span>
        </div>
      </div>
    </div>
  );
};
