import React from 'react';
import { render } from '@testing-library/react';

import ApolloNext from './apollo-next';

describe('ApolloNext', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ApolloNext />);
    expect(baseElement).toBeTruthy();
  });
});
