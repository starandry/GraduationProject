import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '../../../test/utils';
import { ErrorMessage } from './index';

describe('ErrorMessage Component', () => {
  it('renders error message', () => {
    renderWithProviders(<ErrorMessage message="Something went wrong" />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = renderWithProviders(
      <ErrorMessage message="Error" className="custom-error" />
    );
    const errorDiv = container.firstChild;
    expect(errorDiv).toHaveClass('custom-error');
  });

  it('renders with dark theme by default', () => {
    renderWithProviders(<ErrorMessage message="Error" />);
    const errorText = screen.getByText('Error');
    expect(errorText.parentElement).toBeInTheDocument();
  });

  it('renders with light theme', () => {
    renderWithProviders(<ErrorMessage message="Error" />, {
      preloadedState: {
        theme: { isDark: false },
      },
    });
    const errorText = screen.getByText('Error');
    expect(errorText.parentElement).toBeInTheDocument();
  });
});
