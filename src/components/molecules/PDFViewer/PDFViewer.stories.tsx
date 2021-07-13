import React from 'react';
import PDFViewer from './PDFViewer';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';
import { pdfFile } from './pdf';
import { IRequestAttachment } from '../../../types/projects.types';

export default {
  title: 'PDFViewer',
  component: PDFViewer
};

export const sPDFViewer = () => {
  const file:IRequestAttachment = {
    fileName: 'test',
    base64: pdfFile
  };

  return (
    <Story name='Просмотр PDF'>

      <StoryItem description='Компонент просматривает и листает pdf'>
        <PDFViewer file={file} />
      </StoryItem>

    </Story>
  );
};
