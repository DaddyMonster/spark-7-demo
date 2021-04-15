import React from 'react';
import { render } from '@testing-library/react';

import HookChat from './hook-chat';

describe('HookChat', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HookChat />);
    expect(baseElement).toBeTruthy();
  });
});
