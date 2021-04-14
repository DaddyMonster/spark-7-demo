import React, { ComponentType } from 'react';
import { Story } from '@storybook/react';
export function createTemplate<
  Props = Record<string, never>,
  Comp extends ComponentType<Props> = ComponentType<never>
>(Component: Comp, args?: Props) {
  const Template: Story<Props> = (args) => <Component {...(args as never)} />;
  const Story = Template.bind({}) as typeof Template;
  Story.args = args;
  return Story;
}
