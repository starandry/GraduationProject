import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen, userEvent } from '../../../test/utils';
import { Button } from './index';

describe('Button Component', () => {
  it('renders button with children', () => {
    renderWithProviders(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    renderWithProviders(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    renderWithProviders(<Button className="custom-class">Button</Button>);
    const button = screen.getByText('Button');
    expect(button).toHaveClass('custom-class');
  });

  it('renders with different button types', () => {
    const { rerender } = renderWithProviders(<Button type="button">Button</Button>);
    expect(screen.getByText('Button')).toHaveAttribute('type', 'button');

    rerender(<Button type="reset">Reset</Button>);
    expect(screen.getByText('Reset')).toHaveAttribute('type', 'reset');
  });

  it('renders with default submit type', () => {
    renderWithProviders(<Button>Submit</Button>);
    expect(screen.getByText('Submit')).toHaveAttribute('type', 'submit');
  });
});
