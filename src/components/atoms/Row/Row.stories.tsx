import React from 'react';
import Row from './Row';
import Column from '../Column/Column';
import Story from '../../storybook/Story';

export default {
  title: 'Row',
  component: Row
};

const style = {
  height: 30,
  background: '#5199ff'
};

const wrapperStyle = {
  height: 60,
  marginBottom: 20,
  background: '#edf0f7'
};

export const VerticalAlign = () => (
  <Story name='Rows (Ряды)'>
    <div style={wrapperStyle}>
      <Row align='top' gap={20}>
        <Column gap={20} lg={4}>
          <div style={style} />
        </Column>
        <Column gap={20} lg={4}>
          <div style={style} />
        </Column>
        <Column gap={20} lg={4}>
          <div style={style} />
        </Column>
      </Row>
    </div>

    <div style={wrapperStyle}>
      <Row align='middle' gap={20}>
        <Column gap={20} lg={4}>
          <div style={style} />
        </Column>
        <Column gap={20} lg={4}>
          <div style={style} />
        </Column>
        <Column gap={20} lg={4}>
          <div style={style} />
        </Column>
      </Row>
    </div>

    <div style={wrapperStyle}>
      <Row align='bottom' gap={20}>
        <Column gap={20} lg={4}>
          <div style={style} />
        </Column>
        <Column gap={20} lg={4}>
          <div style={style} />
        </Column>
        <Column gap={20} lg={4}>
          <div style={style} />
        </Column>
      </Row>
    </div>
  </Story>
);

export const JustifyContent = () => (
  <Story name='Rows (Ряды)'>
    <Row justify='left' gap={20} mb={20}>
      <Column gap={20} lg={3} md={3} sm={3}>
        <div style={style} />
      </Column>
      <Column gap={20} lg={3} md={3} sm={3}>
        <div style={style} />
      </Column>
    </Row>

    <Row justify='center' gap={20} mb={20}>
      <Column gap={20} lg={3} md={3} sm={3}>
        <div style={style} />
      </Column>
      <Column gap={20} lg={3} md={3} sm={3}>
        <div style={style} />
      </Column>
    </Row>

    <Row justify='right' gap={20} mb={20}>
      <Column gap={20} lg={3} md={3} sm={3}>
        <div style={style} />
      </Column>
      <Column gap={20} lg={3} md={3} sm={3}>
        <div style={style} />
      </Column>
    </Row>

    <Row justify='around' gap={20} mb={20}>
      <Column gap={20} lg={3} md={3} sm={3}>
        <div style={style} />
      </Column>
      <Column gap={20} lg={3} md={3} sm={3}>
        <div style={style} />
      </Column>
    </Row>

    <Row justify='between' gap={20} mb={20}>
      <Column gap={20} lg={3} md={3} sm={3}>
        <div style={style} />
      </Column>
      <Column gap={20} lg={3} md={3} sm={3}>
        <div style={style} />
      </Column>
    </Row>
  </Story>
);
