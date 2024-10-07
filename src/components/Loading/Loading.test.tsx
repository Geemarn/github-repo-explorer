import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Index from './index.tsx';

describe('Loading', () => {
  it('renders all 5 Skeleton components', () => {
    render(<Index />);
    const skeletons = screen.getAllByRole('skeleton-loader');

    expect(skeletons).toHaveLength(5);
  });
});
