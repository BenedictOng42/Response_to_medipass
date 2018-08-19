import React from 'react';
import { shallow } from 'enzyme';

import { Home, mapDispatchToProps } from '../index';

describe('<Home />', () => {
  const props = {
    updateTable: jest.fn(),
    currentPage: [],
    totalCount: 0,
    loading: false,
    error: false,
  };
  const wrapper = shallow(<Home {...props} />);
  describe('render <Home/>', () => {
    it('should render <Home/> properly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('#componentDidMount', () => {
    it('should run the #updateTable function', () => {
      const instance = wrapper.instance();
      instance.componentDidMount();
      expect(instance.props.updateTable).toBeCalled();
    });
  });
  describe('#mapDispatchToProps', () => {
    it('should dispatch', () => {
      const dispatchSpy = jest.fn();
      const actions = mapDispatchToProps(dispatchSpy);
      Object.keys(actions).forEach((action, index) => {
        actions[action]();
        expect(dispatchSpy).toHaveBeenCalledTimes(index + 1);
      });
    });
  });
});
