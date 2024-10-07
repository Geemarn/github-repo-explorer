import { describe, vi, it, expect } from 'vitest';
import useSWR, { mutate } from 'swr';
import { render, screen, waitFor } from '@testing-library/react';
import SearchList from './index.tsx';
import { userEvent } from '@testing-library/user-event';
import { fetcher } from '../../utils.ts';
import { RepoProps } from '../Repo';

vi.mock('swr', () => ({
  default: vi.fn(),
  mutate: vi.fn(),
}));

describe('SearchList', () => {
  const mockUsername = 'mock-user';
  const mockReposUrl = 'https://api.github.com/users/mockuser/repos';
  const mockRepos = [
    {
      id: '1',
      name: 'mock repo 1',
      description: 'mock repo description 1',
      stargazers_count: '0',
    },
    {
      id: '2',
      name: 'mock repo 2',
      description: 'mock repo description 2',
      stargazers_count: '2',
    },
  ];

  const renderSearchList = (data: null | RepoProps[] = null, error: null | Error = null) => {
    (useSWR as any).mockReturnValue({ data, error });
    render(<SearchList username={mockUsername} reposUrl={mockReposUrl} />);
  };

  describe('renders', () => {
    it('should render username and loading component when data from api call is null and error is null', () => {
      renderSearchList();

      const username = screen.getByText(mockUsername);
      expect(username).toBeDefined();

      const loading = screen.getByTestId('loading');
      expect(loading).toBeDefined();
    });

    it('should display error message if data is null and error exists', () => {
      const mockError = new Error('Failed to fetch');
      renderSearchList(null, mockError);

      const errorMessage = screen.getByText(mockError.message);
      expect(errorMessage).toBeDefined();
    });

    it('should display repos when data exists', async () => {
      const user = userEvent.setup();
      renderSearchList(mockRepos, null);

      const usernameElement = screen.getByText(mockUsername);
      await user.click(usernameElement);

      //repo title is present
      await waitFor(() => {
        const repoTitle1 = screen.getByText('mock repo 1');
        const repoTitle2 = screen.getByText('mock repo 2');
        expect(repoTitle1).toBeDefined();
        expect(repoTitle2).toBeDefined();
      });

      //repo description is present
      await waitFor(() => {
        const repoDesp1 = screen.getByText('mock repo description 1');
        const repoDesp2 = screen.getByText('mock repo description 2');
        expect(repoDesp1).toBeDefined();
        expect(repoDesp2).toBeDefined();
      });

      //repo stargazer is present
      await waitFor(() => {
        const repoStar1 = screen.getByText('0');
        const repoStar2 = screen.getByText('2');
        expect(repoStar1).toBeDefined();
        expect(repoStar2).toBeDefined();
      });
    });
  });

  describe('handle accordion click', () => {
    it('should call mutate with fetcher and url when accordion is expanded', async () => {
      const user = userEvent.setup();
      renderSearchList(mockRepos, null);

      const usernameElement = screen.getByText(mockUsername);
      await user.click(usernameElement);

      await waitFor(() => {
        expect(mutate).toHaveBeenCalledWith(mockReposUrl, fetcher(mockReposUrl));
      });
    });
  });
});
