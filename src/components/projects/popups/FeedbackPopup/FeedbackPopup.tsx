import React, { useState } from 'react';
import Star from '../../../_icons/star-fill';
import {
  Button, FileInput, FormGroup, Textarea
} from '../../../../index';
import { IFileData } from '../../../../types';
import { IFeedback, IUser } from '../../../../types/projects.types';
import { BrowserInfo, detect } from 'detect-browser';

export interface IFeedbackPopupProps {
  user: IUser;
  sendFeedback: (data: IFeedback) => void;
  onClose?: () => void;
  serviceManagerUrl?: string;
}

const FeedbackPopup: React.FC<IFeedbackPopupProps> = ({ user, sendFeedback, onClose, serviceManagerUrl = '#' }: IFeedbackPopupProps) => {
  const [rating, setRating] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [attachment, setAttachment] = useState<IFileData[]>([]);

  const stars = [
    1,
    2,
    3,
    4,
    5
  ].map((n: number) => (
    <div
      className={`feedback__star ${n <= rating ? 'feedback__star--active' : ''}`}
      key={n}
      onClick={() => setRating(n)}>
      <Star />
    </div>
  ));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const browser = detect() as BrowserInfo;

    sendFeedback({
      zdate: Date.now().toString(),
      projectId: '1',
      rate: rating * 2,
      browser: `${browser.name} Версия ${browser.version}, ${browser.os}`,
      status: '0',
      text: message,
      userId: user.id,
      userName: user.fullName,
      file64: attachment[0]?.base64 || '',
      screen: `${window.innerWidth}x${window.innerHeight}`,
      photo: user.photo,
      userPosition: user.position,
      userDepartment: user.department,
      email: user.email || ''
    });
    onClose && onClose();
  };

  const setFile = (file: IFileData[]) => {
    if (file.length > 0 && attachment.length < 3) {
      setAttachment(file.slice(0, 3));
    }
  };

  const onKeyUp = (e: React.KeyboardEvent) => {
    setMessage((e.target as HTMLTextAreaElement).value);
  };

  return (
    <form className='feedback-popup' onSubmit={onSubmit}>
      <h2 className='feedback-popup__title'>Обратная связь</h2>
      <h4 className='feedback-popup__subtitle'>Помогите нам стать лучше, оцените работу сервиса.</h4>
      <h4 className='feedback-popup__subtitle'>Для заведения инцидента воспользуйтесь
        <a href={serviceManagerUrl} className='feedback-popup__subtitle--link'>ссылкой на сервис менеджер</a>.</h4>

      <div className='feedback__separator' />

      <div className='feedback__group'>
        <FormGroup label='Оцените нас'>
          <div className='feedback__rating'>{stars}</div>
        </FormGroup>
      </div>

      <div className='feedback__group'>
        <FormGroup label='Добавьте комментарий'>
          <Textarea
            name='message'
            onKeyUp={onKeyUp}
            placeholder='Опишите проблему или оставьте пожелания по работе сервиса.'
          />
        </FormGroup>
      </div>

      <div className='feedback__group'>
        <FileInput
          name='file'
          buttonType='outlinePrimary'
          placeholder='Прикрепить файл'
          setFile={setFile}
          maxSize={500}
          accept='image/*'
        />

        {/* <div className='feedback__file-notifications'>*/}
        {/*  <p className='feedback__file-notification'>Максимальное количество файлов: 3 шт. по 500 Kb.</p>*/}
        {/* </div>*/}
      </div>


      <div className='feedback__footer'>
        <Button className='feedback__action' type='submit'>
          Отправить
        </Button>
        <Button className='feedback__action' buttonType='link' onClick={onClose}>
          Отменить
        </Button>
      </div>
    </form>
  );
};

export default FeedbackPopup;
