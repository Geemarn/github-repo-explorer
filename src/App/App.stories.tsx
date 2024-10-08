import { Meta, StoryObj } from '@storybook/react';
import App from './index';
import { SWRConfig } from 'swr';

const meta = {
  title: 'App',
  tags: ['autodocs'],
  component: App,
  decorators: [
    (Story) => (
      <SWRConfig>
        <Story />
      </SWRConfig>
    ),
  ],
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof App>;

export const Default: Story = {};
