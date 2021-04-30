import { render } from '@testing-library/react';

import StorybookSpark from './storybook-spark';

describe('StorybookSpark', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StorybookSpark />);
    expect(baseElement).toBeTruthy();
  });
});
