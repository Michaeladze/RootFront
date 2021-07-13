import React, { useEffect, useState } from 'react';
import './PDFViewer.scss';
import { IRequestAttachment } from '../../../types/projects.types';
import { Document, Page } from 'react-pdf';
/**  костылики для подключения библиотеки*/
// @ts-ignore
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
// @ts-ignore
import PDFJSWorker from 'pdfjs-dist/build/pdf.worker.entry';
import Button from '../../atoms/Button';
import Arrow from '../../_icons/chevron-left-outline';
pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJSWorker;

export interface IProps {
  file: IRequestAttachment;
}

const PDFViewer: React.FC<IProps> = ({ file }: IProps) => {
  /** всего страниц в документе*/
  const [numPages, setNumPages] = useState(1);
  /** текущая страниа*/
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setNumPages(1);
    setCurrentPage(1);
  }, [file]);

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }:{numPages:number}) => setNumPages(nextNumPages);
  // ===================================================================================================================
  /** листаем страницы*/
  const nextPage = (num:number) => {
    const sum = currentPage + num;
    sum > 0 && sum <= numPages && setCurrentPage(sum);
  };
  // ===================================================================================================================
  return <> { file &&
      <div className='pdf-document'>
        <Document file={ file.base64 } onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={currentPage}/>
        </Document>
        <div className='pdf-document__pager'>
          <Button buttonType='text' onClick={() => nextPage(-1)}>
            <div className={currentPage > 1 ? 'pdf-document__pager-button--active' : 'pdf-document__pager-button'}>
              <Arrow/>
            </div>
          </Button>
          <div className='pdf-document__pager-text'>{`${currentPage} / ${numPages}`}</div>
          <Button buttonType='text' onClick={() => nextPage(1)}>
            <div className={currentPage < numPages ? 'pdf-document__pager-button--active' : 'pdf-document__pager-button'}>
              <Arrow transform={'rotate(180)'}/>
            </div>
          </Button>
        </div>
      </div>
  }</>;
};

export default PDFViewer;
