import React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import SearchList from './';
import { SWRConfig } from 'swr';

export default {
  title: 'Components/SearchList',
  component: SearchList,
  tags: ['autodocs'],
  argTypes: {
    username: { control: 'text' },
    reposUrl: { control: 'text' },
  },
} as Meta<typeof SearchList>;

type Story = StoryObj<typeof SearchList>;

const MockSWRConfig = ({ children, swrData }: { children: React.ReactNode; swrData: any }) => (
  <SWRConfig value={{ fetcher: () => Promise.resolve(swrData), dedupingInterval: 0 }}>{children}</SWRConfig>
);

export const Default: Story = {
  args: {
    username: 'user',
    reposUrl: 'https://api.github.com/users/user1/repos',
  },
  render: (args, { loaded }) => (
    <MockSWRConfig swrData={loaded.data}>
      <SearchList {...args} />
    </MockSWRConfig>
  ),
  loaders: [
    async () => ({
      data: [
        { id: '1', name: 'Repo 1', description: 'repository 1', stargazers_count: '10' },
        { id: '2', name: 'Repo 2', description: 'repository 2', stargazers_count: '5' },
        { id: '3', name: 'Repo 3', description: 'repository 3', stargazers_count: '1' },
        { id: '4', name: 'Repo 4', description: 'repository 4', stargazers_count: '0' },
        { id: '5', name: 'Repo 5', description: 'repository 5', stargazers_count: '50' },
        { id: '6', name: 'Repo 6', description: 'repository 6', stargazers_count: '7' },
        { id: '7', name: 'Repo 7', description: 'repository 7', stargazers_count: '9' },
        { id: '8', name: 'Repo 8', description: 'repository 8', stargazers_count: '0' },
        { id: '9', name: 'Repo 9', description: 'repository 9', stargazers_count: '5000' },
        { id: '10', name: 'Repo 10', description: 'repository 10', stargazers_count: '15000000' },
      ],
    }),
  ],
};

// Story to simulate the loading state
export const Loading: Story = {
  args: {
    username: 'user',
    reposUrl: 'https://api.github.com/users/loading_user/repos',
  },
  render: (args) => (
    <MockSWRConfig swrData={null}>
      <SearchList {...args} />
    </MockSWRConfig>
  ),
};

// Story to simulate the error state
export const Error: Story = {
  args: {
    username: 'user',
    reposUrl: 'https://api.github.com/users/error_user/repos',
  },
  render: (args) => (
    <MockSWRConfig swrData={null}>
      <SearchList {...args} />
    </MockSWRConfig>
  ),
  loaders: [
    async () => {
      throw {
        message: 'Error loading repos',
      };
    },
  ],
};
