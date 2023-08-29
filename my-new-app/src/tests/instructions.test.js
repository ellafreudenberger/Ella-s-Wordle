import { render } from '@testing-library/react';
import React from 'react';
import Instructions from './instructions';

test('renders instructions component snapshot', () => {
  const { asFragment } = render(<Instructions />);
  expect(asFragment()).toMatchSnapshot();
});

