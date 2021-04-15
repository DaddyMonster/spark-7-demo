import React from 'react';
import { render } from '@testing-library/react';

import UiWebNavs from './ui-web-navs';

describe('UiWebNavs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiWebNavs />);
    expect(baseElement).toBeTruthy();
  });
});
