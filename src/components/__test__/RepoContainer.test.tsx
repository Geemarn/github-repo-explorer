import { describe, expect, it } from 'vitest';
import { RepoContainerProps } from '../SearchList.tsx';
import { render, screen } from '@testing-library/react';
import RepoContainer from '../RepoContainer.tsx';

describe('RepoContainer', () => {
  const mockRepo: RepoContainerProps = {
    name: 'Test Repo',
    description: 'This is a test repository',
    stargazers_count: '150',
  };
  it('should display the Star icon', () => {
    render(<RepoContainer {...mockRepo} />);

    const starIconElement = screen.getByTestId('star-icon');
    expect(starIconElement).toBeDefined();
  });

  it('should render repository name, description, and stargazer count', () => {
    render(<RepoContainer {...mockRepo} />);

    const nameElement = screen.getByText(mockRepo.name);
    expect(nameElement).toBeDefined();

    const descriptionElement = screen.getByText(mockRepo.description);
    expect(descriptionElement).toBeDefined();

    const stargazerCountElement = screen.getByText(mockRepo.stargazers_count);
    expect(stargazerCountElement).toBeDefined();
  });
});
