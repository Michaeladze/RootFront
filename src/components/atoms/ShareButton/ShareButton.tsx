import React, { HTMLProps } from 'react';
import './ShareButton.scss';
import Share from '../../_icons/share';
import Button from '../Button';
import { sendNotification } from '../../../index';

export type IShareButtonProps = HTMLProps<HTMLElement>

const ShareButton: React.FC<IShareButtonProps> = ({ ...props }: IShareButtonProps) => {
  const onClick = () => {
    const tmp = document.createElement('textarea');
    tmp.style.position = 'absolute';
    tmp.style.opacity = '0';
    tmp.textContent += window.location.href;
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand('copy');
    document.body.removeChild(tmp);
    sendNotification({
      message: 'Ссылка скопирована в буфер обмена',
      variant: 'info'
    });
  };

  return (
    // @ts-ignore
    <Button {...props} buttonType='round' className={`${props.className || ''}`} onClick={onClick}>
      <Share />
    </Button>
  );
};

export default ShareButton;
