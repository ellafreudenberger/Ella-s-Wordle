import React from 'react';
import renderer from 'react-test-renderer';
import Instructions from './instructions';

test('Instructions snapshot', () => {
  const component = renderer.create(<Instructions/>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
