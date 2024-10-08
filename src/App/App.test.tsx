import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Index from './index.tsx';
import useSWR from 'swr';
import { userEvent } from '@testing-library/user-event';

vi.mock('swr', () => ({
  default: vi.fn(),
}));

describe('App', () => {
  const mockUsers = {
    items: [
      {
        id: '1',
        login: 'mock user 1',
        repos_url: 'https://api.github.com/users/mockuser1/repos',
      },
      {
        id: '2',
        login: 'mock user 2',
        repos_url: 'https://api.github.com/users/mockuser1/repos',
      },
    ],
  };

  type renderAppWithMockDataProps = { data?: any; error?: any; isLoading?: boolean };
  const renderAppWithMockData = ({ data = null, error = null, isLoading = false }: renderAppWithMockDataProps) => {
    (useSWR as any).mockReturnValue({
      data,
      error,
      isLoading,
    });
    render(<Index />);
  };

  describe('render', () => {
    it('renders the search form (input and button component)', () => {
      renderAppWithMockData({});
      const inputElement = screen.getByLabelText('Enter Username');
      expect(inputElement).toBeDefined();

      const buttonElement = screen.getByRole('button', { name: /Search/i });
      expect(buttonElement).toBeDefined();
    });

    it('shows loading when fetching data', () => {
      renderAppWithMockData({ data: null, error: null, isLoading: true });

      const loadingElement = screen.getByTestId('loading');
      expect(loadingElement).toBeDefined();
    });

    it('displays error message if there is an error', () => {
      const mockError = new Error('Failed to fetch users');
      renderAppWithMockData({ data: null, error: mockError, isLoading: false });

      const errorMessage = screen.getByText(mockError.message);
      expect(errorMessage).toBeDefined();
    });

    it('displays the list of users when data is available', async () => {
      renderAppWithMockData({ data: mockUsers, error: null, isLoading: false });

      await waitFor(() => {
        const user1 = screen.getByText('mock user 1');
        const user2 = screen.getByText('mock user 2');
        expect(user1).toBeDefined();
        expect(user2).toBeDefined();
      });
    });
  });

  describe('handle form submit', () => {
    const user = userEvent.setup();
    it('should display mock text value after button submit', async () => {
      renderAppWithMockData({});

      const input = screen.getByLabelText('Enter Username');
      const button = screen.getByRole('button', { name: 'Search' });

      await user.type(input, 'mockValue');
      await user.click(button);

      const mockText = screen.getByText('Showing users for "mockValue"');
      expect(mockText).toBeDefined();
    });
  });
});
