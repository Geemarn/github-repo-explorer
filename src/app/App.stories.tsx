import { Meta, StoryObj } from '@storybook/react';
import App from './';
import { SWRConfig } from 'swr';

const meta = {
  title: 'app',
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
