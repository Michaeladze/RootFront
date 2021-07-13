import React, { useState } from 'react';
import StoryItem from '../../storybook/StoryItem';

import { IRequestAttachment } from '../../../types/projects.types';
import CertReader from './CertReader';
import { pdfFile } from '../PDFViewer/pdf';
import './CertReader.scss';
export default {
  title: 'CertReader',
  component: CertReader
};

export const sCertReader = () => {
  const [sign, setSign] = useState<IRequestAttachment|undefined>(undefined);
  const file:IRequestAttachment = {
    fileName: 'test',
    base64: pdfFile
  };
  const successHandle = (result:IRequestAttachment) => {

    setSign(result);
    console.log(result);
  };
  const errorHandle = (e) => {
    debugger;
    setSign(undefined);
    console.error('Ошибка: ', e);
  };

  return (


    <StoryItem description='Проверка сертификата'>
      <>
        <a href='https://cryptopro.ru/sites/default/files/products/cades/demopage/cades_bes_sample.html'>
          Проверить работу плагина
        </a>
        <div className='cert__wrapper' >
          <CertReader file={file} onSuccess={successHandle} onError={errorHandle}/>
        </div>
        <div className={sign ? 'cert__success' : 'cert__error'}>{sign ? `Подписано ${sign.cert}` : 'не подписано'}</div>

      </>
    </StoryItem>

  );
};
