import React from 'react';
import { render } from '@testing-library/react';

import HookRecog from './hook-recog';

describe('HookRecog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HookRecog />);
    expect(baseElement).toBeTruthy();
  });
});
