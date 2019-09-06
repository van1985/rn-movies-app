// @Vendors
import React from 'react';
import { shallow } from 'enzyme';

// @Components
import EmptyState from '../EmptyState';

/* eslint-disable function-paren-newline */
describe('EmptyState test suite', () => {
  test('Rendered component should present a Text and a Image components if type is provided (error type)', () => {
    const wrapper = shallow(<EmptyState messageText="mock" type="error" />);
    expect(wrapper.find('Image').props().source).toEqual({
      testUri: '../../../src/assets/png/error.png'
    });
    expect(wrapper.find('Image').length).toBe(1);
    expect(wrapper.find('Text').length).toBe(1);
  });

  test('Rendered component should present a Text and a Image components if type is provided (empty type)', () => {
    const wrapper = shallow(<EmptyState messageText="mock" type="empty" />);
    expect(wrapper.find('Image').props().source).toEqual({
      testUri: '../../../src/assets/png/empty.png'
    });
    expect(wrapper.find('Image').length).toBe(1);
    expect(wrapper.find('Text').length).toBe(1);
  });

  test('Rendered component should present a Text and a Image components if type is provided (unknown type)', () => {
    const wrapper = shallow(<EmptyState messageText="mock" type="unknown" />);
    expect(wrapper.find('Image').props().source).toEqual(null);
    expect(wrapper.find('Image').length).toBe(1);
    expect(wrapper.find('Text').length).toBe(1);
  });

  test('Rendered component should present a Text and a no Image components if type is not provided', () => {
    const wrapper = shallow(<EmptyState messageText="mock" />);
    expect(wrapper.find('Image').length).toBe(0);
    expect(wrapper.find('Text').length).toBe(1);
  });
});
