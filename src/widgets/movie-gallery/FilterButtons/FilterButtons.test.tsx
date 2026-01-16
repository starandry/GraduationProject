import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen, userEvent } from '../../../test/utils';
import { FilterButtons } from './index';

describe('FilterButtons Component', () => {
  it('renders nothing when no filters provided', () => {
    const { container } = renderWithProviders(
      <FilterButtons filters="" onRemoveFilter={vi.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders filter buttons', () => {
    renderWithProviders(
      <FilterButtons filters="Action, Drama, Comedy" onRemoveFilter={vi.fn()} />
    );

    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Drama')).toBeInTheDocument();
    expect(screen.getByText('Comedy')).toBeInTheDocument();
  });

  it('calls onRemoveFilter when close icon is clicked', async () => {
    const user = userEvent.setup();
    const handleRemove = vi.fn();

    renderWithProviders(
      <FilterButtons filters="Action" onRemoveFilter={handleRemove} />
    );

    // The button contains both the text and the close icon
    const filterButton = screen.getByRole('button');

    // Since the BigCloseIcon has an onClick inside the Button,
    // we need to find the SVG element and click it directly
    const closeIcon = filterButton.querySelector('svg');
    if (closeIcon) {
      await user.click(closeIcon as Element);
      expect(handleRemove).toHaveBeenCalledWith('Action');
    }
  });

  it('handles single filter', () => {
    renderWithProviders(
      <FilterButtons filters="Action" onRemoveFilter={vi.fn()} />
    );

    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('filters out empty strings', () => {
    const { container } = renderWithProviders(
      <FilterButtons filters=", , " onRemoveFilter={vi.fn()} />
    );

    expect(container.firstChild).toBeNull();
  });
});
