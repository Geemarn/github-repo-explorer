import { StoryObj, Meta } from '@storybook/react';
import SearchForm from './';
import { fn } from '@storybook/test';

export default {
  title: 'Components/SearchForm',
  component: SearchForm,
  tags: ['autodocs'],
  argTypes: {
    errormessage: { control: 'text' },
  },
  args: {
    setInputValue: fn(),
    handleSubmitForm: fn(),
  },
} as Meta<typeof SearchForm>;

type Story = StoryObj<typeof SearchForm>;

export const Default: Story = {
  args: {
    errormessage: '',
  },
};

export const WithErrorMessage: Story = {
  args: {
    errormessage: 'Username is required!',
  },
};
