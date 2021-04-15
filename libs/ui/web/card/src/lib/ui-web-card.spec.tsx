import React from 'react';
import { render } from '@testing-library/react';

import UiWebCard from './ui-web-card';

describe('UiWebCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiWebCard />);
    expect(baseElement).toBeTruthy();
  });
});
