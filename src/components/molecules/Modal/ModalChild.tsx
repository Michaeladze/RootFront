import React from 'react';
import Button from '../../atoms/Button/Button';

const ModalChild: React.FC = () => {
  return (
    <div className='rf-modal-child'>
      <h1 className='rf-modal-child__title'>Заголовок модального окна</h1>
      <p className='rf-modal-child__text'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae nunc sit amet lacus venenatis tincidunt ac
        in lorem. Pellentesque nec lectus nisl. Proin rutrum dapibus ante, non hendrerit arcu euismod eget. Aliquam
        aliquet pulvinar ante. Vivamus non diam purus. Maecenas sagittis est eu feugiat dignissim. Aenean lacinia ut
        mauris ac ultricies. Nullam at quam nec quam porta mattis ac sed lorem. Vestibulum sed ornare augue. Sed at
        tincidunt quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed rutrum odio arcu, quis sodales
        augue ullamcorper at. Proin pulvinar odio sed metus feugiat, vel volutpat velit sollicitudin. Maecenas in cursus
        risus. Pellentesque quis auctor turpis. Pellentesque nec egestas elit.
      </p>
      <Button buttonType='primary'>Какая-то кнопка</Button>
    </div>
  );
};

export default ModalChild;
