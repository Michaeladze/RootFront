import React, { useEffect, useState } from 'react';
import StoryItem from '../../storybook/StoryItem';
import Story from '../../storybook/Story';
import { ITreeOption } from '../../../types';
import SelectTree from './SelectTree';
import list from './test.data';
import { Input } from '../../../index';
import { treeDeepSearch } from '../../../utils/treeHelpers';

export default {
  title: 'SelectTree',
  component: SelectTree
};

export const selectTree = () => {

  const [data, setData] = useState<ITreeOption[]>(list);
  const [search, setSearch] = useState<string>('');

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setData(treeDeepSearch(list, search));
  }, [search]);


  const onChange = (value: ITreeOption, tree: ITreeOption[]) => {
    console.log(value, tree);
  };

  return (
    <Story name='CheckboxTree' width={600}>
      <StoryItem description='Древовидная структура с бесконечной вложенностью'>
        <div style={{ marginBottom: '16px' }}>
          <Input value={search} placeholder='Поиск...' search onChange={onSearch}/>
        </div>
        <SelectTree list={data} onChange={onChange} multiple={false}/>
      </StoryItem>
    </Story>
  );
};
