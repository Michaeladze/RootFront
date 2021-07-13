// import { mount } from 'enzyme';
// import React, { ReactElement } from 'react';
// import Breadcrumbs from './Breadcrumbs';
// import { IBreadcrumb } from '../../../types';
// import { BrowserRouter } from 'react-router-dom';
//
// describe('Test <Breadcrumbs/> component', () => {
//   const breadcrumbs: IBreadcrumb[] = [
//     {
//       label: 'Главная',
//       url: '/home'
//     },
//     {
//       label: 'Изменение графика рабочего времени',
//       url: '/request',
//       disabled: false
//     },
//     {
//       label: 'трампампам',
//       url: '/request',
//       disabled: true
//     }
//   ];
//
//   const breadcrumbsJSX: ReactElement = (
//     <BrowserRouter>
//       <Breadcrumbs list={breadcrumbs} />
//     </BrowserRouter>
//   );
//
//   it('should render 3 div.breadcrumb', () => {
//     const wrapper = mount(breadcrumbsJSX);
//     expect(wrapper.find('.breadcrumb')).toHaveLength(3);
//   });
//
//   it('should have last crumb disabled', () => {
//     const wrapper = mount(breadcrumbsJSX);
//     const lastCrumb = wrapper.find('.breadcrumb').at(2);
//     const lastCrumbLink = lastCrumb.find('.breadcrumb__link').at(0);
//     expect(lastCrumbLink.hasClass('breadcrumb__link--disabled')).toBeTruthy();
//   });
// });
