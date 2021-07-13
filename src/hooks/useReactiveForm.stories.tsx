import React from 'react';
import { useReactiveForm } from 'use-reactive-form';
import {
  Button, Checkbox, Datepicker, FormGroup, Input, InputPhone, Radio, Select, Textarea
} from '../index';
import NewDatepicker from '../components/organisms/NewDatepicker';
import { IOption } from '../types';
import { object, string } from 'yup';

export default { title: 'Hooks/useReactiveForm' };

export const useReactiveFormHook = () => {
  const config = {
    fields: {
      phone: '',
      parent: [{ child: 'Parent Child Structure' }],
      customDate: new Date(),
      dateFrom: new Date(),
      dateTo: null,
      text: '',
      textarea: 'Default textarea',
      radio: '3',
      checkbox: ['1', '2'],
      select: '1',
      selectMulti: ['2', '3'],
      numberAsKey: { 50: '50' }
    },
    schema: object().shape({
      phone: string().length(12),
      text: string().required()
    }),
  };

  const { ref, values, update, validate } = useReactiveForm(config);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      console.log(values);
    } else {
      alert('error');
    }
  };

  const selectOptions: IOption[] = [
    {
      value: '1',
      label: 'Option 1'
    },
    {
      value: '2',
      label: 'Option 2'
    },
    {
      value: '3',
      label: 'Option 3'
    }
  ];

  const style: any = { marginBottom: '20px' };

  const onDateChange = (date: Date | null, name?: string) => {
    if (name) {
      update({
        ...values,
        [name]: date
      });
    }
  };

  return (
    <form ref={ref} onSubmit={onSubmit}>
      <div style={style}>
        <FormGroup label='Phone'>
          <InputPhone name='phone' />
        </FormGroup>
      </div>

      <div style={style}>
        <FormGroup label='Date from'>
          <Datepicker name='dateFrom' value={values.dateFrom} onChange={onDateChange} />
        </FormGroup>
      </div>

      <div style={style}>
        <FormGroup label='New datepicker'>
          <NewDatepicker name='customDate' defaultValue={values.customDate} />
        </FormGroup>
      </div>

      <div style={style}>
        <FormGroup label='Date to'>
          <Datepicker name='dateTo' minDate={values.dateFrom} value={values.dateTo} onChange={onDateChange} />
        </FormGroup>
      </div>

      <div style={style}>
        <FormGroup label='Text'>
          <Input name='text' defaultValue={values.text} />
        </FormGroup>
      </div>

      <div style={style}>
        <FormGroup label='TextArea'>
          <Textarea name='textarea' defaultValue={values.textarea} />
        </FormGroup>
      </div>

      <div style={style}>
        <FormGroup label='Radio'>
          <div style={style}>
            <Radio name='radio' value='1' label='Radio 1' defaultChecked={values.radio === '1'} />
          </div>
          <div style={style}>
            <Radio name='radio' value='2' label='Radio 2' defaultChecked={values.radio === '2'} />
          </div>
          <div style={style}>
            <Radio name='radio' value='3' label='Radio 3' defaultChecked={values.radio === '3'} />
          </div>
        </FormGroup>
      </div>

      <div style={style}>
        <FormGroup label='Checkbox'>
          <div style={style}>
            <Checkbox name='checkbox' value='1' label='Checkbox 1' defaultChecked={values.checkbox.includes('1')} />
          </div>
          <div style={style}>
            <Checkbox name='checkbox' value='2' label='Checkbox 2' defaultChecked={values.checkbox.includes('2')} />
          </div>
          <div style={style}>
            <Checkbox name='checkbox' value='3' label='Checkbox 3' defaultChecked={values.checkbox.includes('3')} />
          </div>
        </FormGroup>
      </div>

      <div style={style}>
        <FormGroup label='SelectMulti'>
          <Select
            options={selectOptions}
            name='selectMulti'
            multiSelect
            value={values.selectMulti}
            placeholder='Multi-select'
          />
        </FormGroup>
      </div>

      <div style={style}>
        <FormGroup label='Select'>
          <Select options={selectOptions} name='select' value={values.select} placeholder='Select' />
        </FormGroup>
      </div>

      <div style={style}>
        <FormGroup label='Parent Child'>
          <Input name='parent_[0]_child' value={values.parent[0].child} />
        </FormGroup>
      </div>

      <div style={style}>
        <FormGroup label='Number as key'>
          <Input name='numberAsKey_50' value={values.numberAsKey[50]} />
        </FormGroup>
      </div>

      <div style={style}>
        <Button type='submit'> Submit </Button>
      </div>
    </form>
  );
};
