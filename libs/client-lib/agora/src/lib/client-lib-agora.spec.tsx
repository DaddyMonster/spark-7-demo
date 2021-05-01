import React from 'react';
import { render } from '@testing-library/react';

import ClientLibAgora from './client-lib-agora';

describe('ClientLibAgora', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientLibAgora />);
    expect(baseElement).toBeTruthy();
  });
});
