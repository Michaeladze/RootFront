import React, { useEffect, useState } from 'react';
import './Confirm.scss';
import {
  FormGroup, PopupFooter, Textarea
} from '../../../../index';


export interface IConfirmProps {
  /** Текст сабмита */
  textAccept: string;
  /** Действие */
  onAction: (comment?: string) => void;
  /** Текст подтверждения */
  text?: string;
  onClose?: () => void;
  /** Комментарий */
  comment?: string;
  /** Показать комментарий */
  showComment?: boolean;
}

const Confirm: React.FC<IConfirmProps> = ({
  comment,
  showComment = false,
  textAccept,
  onAction,
  onClose,
  text
}: IConfirmProps) => {

  const handleSubmit = () => {
    onAction(state);
    onClose && onClose();
  };

  const [state, setState] = useState<string>('');

  useEffect(() => {
    if (comment && showComment) {
      setState(comment);
    }
  }, [comment, showComment]);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState(e.target.value);
  };


  return (
    <div className='confirm-popup'>
      <h2 className='confirm-popup__title'>Подтвердите действие</h2>
      {text && <p className='confirm-popup__text'>{text}</p>}
      {
        showComment && (
          <FormGroup label='Комментарий'>
            <Textarea value={state} onChange={onChange}/>
          </FormGroup>
        )
      }
      <PopupFooter onSubmit={handleSubmit} disabled={showComment && state === ''} onClose={onClose} textAccept={textAccept}/>
    </div>
  );
};

export default Confirm;
