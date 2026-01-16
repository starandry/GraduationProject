import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '../../../../test/utils';
import { MovieGrid } from './index';
import { mockMovies } from '../../../../test/mockData';

describe('MovieGrid Component', () => {
  it('renders nothing when no movies provided', () => {
    const { container } = renderWithProviders(<MovieGrid movies={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders movie cards in grid', () => {
    renderWithProviders(<MovieGrid movies={mockMovies} />);

    expect(screen.getByText('The Matrix')).toBeInTheDocument();
    expect(screen.getByText('The Matrix Reloaded')).toBeInTheDocument();
    expect(screen.getByText('The Matrix Revolutions')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = renderWithProviders(
      <MovieGrid movies={mockMovies} className="custom-grid" />
    );

    const grid = container.firstChild;
    expect(grid).toHaveClass('custom-grid');
  });

  it('renders correct number of movie cards', () => {
    renderWithProviders(<MovieGrid movies={mockMovies} />);

    const movieCards = screen.getAllByRole('link');
    expect(movieCards).toHaveLength(mockMovies.length);
  });
});
