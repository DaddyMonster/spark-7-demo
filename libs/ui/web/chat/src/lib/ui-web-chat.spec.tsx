import React from 'react';
import { render } from '@testing-library/react';

import UiWebChat from './ui-web-chat';

describe('UiWebChat', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiWebChat />);
    expect(baseElement).toBeTruthy();
  });
});
