import { Meta, StoryObj } from '@storybook/react';
import Repo from './';

export default {
  title: 'Components/Repo',
  component: Repo,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    description: { control: 'text' },
    stargazers_count: { control: 'text' },
  },
} satisfies Meta<typeof Repo>;

type Story = StoryObj<typeof Repo>;

export const Default: Story = {
  args: {
    name: 'storybook repo',
    description: 'this is a storybook repo description',
    stargazers_count: '20',
  },
};

export const EmptyName: Story = {
  args: {
    name: '',
    description: 'this is a storybook repo description',
    stargazers_count: '100',
  },
};

export const EmptyDescription: Story = {
  args: {
    name: 'storybook repo',
    description: '',
    stargazers_count: '0',
  },
};
