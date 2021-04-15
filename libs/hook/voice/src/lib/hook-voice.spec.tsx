import React from 'react';
import { render } from '@testing-library/react';

import HookVoice from './hook-voice';

describe('HookVoice', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HookVoice />);
    expect(baseElement).toBeTruthy();
  });
});
