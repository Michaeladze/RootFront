import React, { useEffect, useState } from 'react';
import './CertReader.scss';
import { IRequestAttachment } from '../../../types/projects.types';
import Menu from '../Menu';
import { Button } from '../../../index';
import { IListElement } from '../../../types';
import { createSignature, getUserCertificates } from 'crypto-pro';

export interface IProps {
  /** входящий файл на подпись*/
  file: IRequestAttachment;
  /** успех*/
  onSuccess:(result:ICertResult)=>void
  /** ошибка в тч и с плагинами*/
  onError:(e:any)=> void;
  /** название кнопки*/
  buttonTitle?:string
}
interface IBrowserCert{
  /** имя пользователя*/
  issuerName: string;
  /** название сертификата*/
  name: string;
  /** персональный ключ*/
  thumbprint: string;
}

export interface ICertResult {
  data:IRequestAttachment
  cert:IBrowserCert
}
const CertReader: React.FC<IProps> = ({ file,
  onSuccess,
  onError,
  buttonTitle = 'Подписать ЕЦП (цифровая подпись)' }: IProps) => {
  /** все доступные сертификаты*/
  const [ certs, setCerts ] = useState<null|IBrowserCert[]>(null);
  // ===================================================================================================================
  /** асинхронное получение серификатов с ключа*/
  useEffect(() => {
    async function getCertificates() {
      try {
        setCerts(await getUserCertificates());
      } catch (e) {
        setCerts(null);
        onError(e);
      }
    }
    getCertificates().then();
  }, []);
  // ===================================================================================================================
  /** формирование меню*/
  const menuBuilder = (certs:IBrowserCert[]):IListElement[] => {
    return certs.map((item:IBrowserCert) => {
      return {
        label: item.name + ` ( ${item.issuerName})`,
        value: item.thumbprint,
        handler: async() => {
          debugger;
          try {

            onSuccess({
              data: {
                ...file,
                // @ts-ignore
                // singBase64_new: await createAttachedSignature(item.thumbprint, file.base64.split('base64,')[1]),
                singBase64: (await createSignature(item.thumbprint, file.base64.split('base64,')[1])).replace(/[\r\n]+/g, '\n'),
                cert: item.thumbprint
              },
              cert: item
            });
          } catch (e) {
            onError(e);
          }
        }
      };
    });
  };


  // ===================================================================================================================
  return <>
    <Menu position='left' list={certs ? menuBuilder(certs) : undefined} >
      <Button disabled={!certs}>{buttonTitle}</Button>
    </Menu>
  </>;
};

export default CertReader;
