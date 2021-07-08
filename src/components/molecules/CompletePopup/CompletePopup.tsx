import React from 'react';
import './CompletePopup.scss';
import { Button } from '../../../index';
import CircleConfirm from '../../_icons/circle-confirm';
import CircleReject from '../../_icons/circle-reject';


export interface ICompletePopupProps {
    label: string;
    onClose: () => void;
    confirm?: boolean;
}

const CompletePopup: React.FC<ICompletePopupProps> = ({ label, onClose, confirm }: ICompletePopupProps) => {


  // -------------------------------------------------------------------------------------------------------------------


  return (
    <div className='rf-complete-popup'>
      { confirm ? <CircleConfirm/> : <CircleReject/> }
      <p className='rf-complete-popup__label'>{label}</p>
      <Button fullWidth onClick={onClose}>Закрыть</Button>
    </div>
  );
};

export default CompletePopup;
