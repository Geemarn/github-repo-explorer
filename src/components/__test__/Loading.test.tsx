import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loading from '../Loading';

describe('Loading', () => {
  it('renders all 5 Skeleton components', () => {
    render(<Loading />);
    const skeletons = screen.getAllByRole('skeleton-loader');

    expect(skeletons).toHaveLength(5);
  });
});
