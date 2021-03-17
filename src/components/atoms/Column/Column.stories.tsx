import React, { CSSProperties } from 'react';
import Column from './Column';
import Row from '../Row/Row';
import Story from '../../storybook/Story';

export default {
  title: 'Column',
  component: Column
};

const style: CSSProperties = {
  height: 30,
  lineHeight: '30px',
  backgroundColor: '#5199ff',
  fontSize: 18,
  color: '#fff',
  textAlign: 'center',
  marginBottom: 10
};

export const grid = () => (
  <Story name='Column (Колонки)'>
    <Row>
      <Column sm={12} md={4} lg={12}>
        <div style={style}>sm: 12, md: 4, lg: 12</div>
      </Column>
    </Row>

    <Row gap={10}>
      {[1, 2].map((key) => (
        <Column gap={10} sm={12} md={3} lg={6} key={key}>
          <div style={style}>sm: 12, md: 3, lg: 6</div>
        </Column>
      ))}
    </Row>

    <Row gap={10}>
      {[1, 2, 3].map((key) => (
        <Column gap={10} key={key} sm={12} md={6} lg={4}>
          <div style={style}>sm: 12, md: 6, lg: 4</div>
        </Column>
      ))}
    </Row>

    <Row gap={10}>
      {[
        1,
        2,
        3,
        4
      ].map((key) => (
        <Column gap={10} sm={12} md={4} lg={3} key={key}>
          <div style={style}>sm: 12, md: 4, lg: 3</div>
        </Column>
      ))}
    </Row>

    <Row gap={10}>
      {[
        1,
        2,
        3,
        4,
        5,
        6
      ].map((key) => (
        <Column gap={10} sm={12} md={3} lg={2} key={key}>
          <div style={style}>sm: 12, md: 3, lg: 2</div>
        </Column>
      ))}
    </Row>

    <Row gap={10}>
      {[
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ].map((key) => (
        <Column gap={10} sm={12} md={3} lg={1} key={key}>
          <div style={style}>sm: 12, md: 3, lg: 1</div>
        </Column>
      ))}
    </Row>

    <Row>
      <Column>
        <div style={style}>a u t o</div>
      </Column>
    </Row>
  </Story>
);

export const verticalAlign = () => (
  <Story name='Column (Колонки)'>
    <Row gap={20}>
      <Column gap={20} lg={4} align='top'>
        <div style={style} />
      </Column>
      <Column gap={20} lg={4} align='middle'>
        <div style={style} />
      </Column>
      <Column gap={20} lg={4} align='bottom'>
        <div style={style} />
      </Column>
      <div style={{ height: 90 }} />
    </Row>
  </Story>
);
