import React from 'react';
import { render } from '@testing-library/react';

import UiWebCarousel from './ui-web-carousel';

describe('UiWebCarousel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiWebCarousel />);
    expect(baseElement).toBeTruthy();
  });
});
