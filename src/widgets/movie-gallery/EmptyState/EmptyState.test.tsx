import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '../../../../test/utils';
import { EmptyState } from './index';

describe('EmptyState Component', () => {
  it('renders with default props', () => {
    renderWithProviders(<EmptyState />);
    expect(screen.getByAltText('Empty state')).toBeInTheDocument();
  });

  it('renders with custom image source', () => {
    renderWithProviders(<EmptyState imageSrc="custom-image.png" />);
    const image = screen.getByAltText('Empty state') as HTMLImageElement;
    expect(image.src).toContain('custom-image.png');
  });

  it('renders with custom alt text', () => {
    renderWithProviders(<EmptyState altText="No items found" />);
    expect(screen.getByAltText('No items found')).toBeInTheDocument();
  });

  it('renders with custom caption', () => {
    renderWithProviders(<EmptyState caption="No movies to display" />);
    expect(screen.getByText('No movies to display')).toBeInTheDocument();
  });

  it('renders all custom props together', () => {
    renderWithProviders(
      <EmptyState
        imageSrc="no-data.png"
        altText="No data"
        caption="Please add some items"
      />
    );

    expect(screen.getByAltText('No data')).toBeInTheDocument();
    expect(screen.getByText('Please add some items')).toBeInTheDocument();
  });
});
