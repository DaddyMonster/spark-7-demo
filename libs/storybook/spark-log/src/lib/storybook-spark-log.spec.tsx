import { render } from '@testing-library/react';

import StorybookSparkLog from './storybook-spark-log';

describe('StorybookSparkLog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StorybookSparkLog />);
    expect(baseElement).toBeTruthy();
  });
});
