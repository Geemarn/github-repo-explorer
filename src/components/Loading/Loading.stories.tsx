import { Meta, StoryObj } from '@storybook/react';
import Loading from './';

export default {
  title: 'Components/Loading',
  tags: ['autodocs'],
  component: Loading,
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof Loading>;

type Story = StoryObj<typeof Loading>;

export const Default: Story = {
  args: {},
};
