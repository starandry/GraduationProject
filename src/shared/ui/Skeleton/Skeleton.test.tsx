import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '../../../test/utils';
import { Skeleton, MovieCardSkeleton, GallerySkeleton } from './index';

describe('Skeleton Components', () => {
  describe('Skeleton', () => {
    it('renders with default props', () => {
      const { container } = renderWithProviders(<Skeleton />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toBeInTheDocument();
    });

    it('applies custom dimensions', () => {
      const { container } = renderWithProviders(
        <Skeleton width={100} height={50} />
      );
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveStyle({ width: '100px', height: '50px' });
    });

    it('applies custom border radius', () => {
      const { container } = renderWithProviders(<Skeleton borderRadius={10} />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveStyle({ borderRadius: '10px' });
    });

    it('renders with dark theme', () => {
      const { container } = renderWithProviders(<Skeleton />, {
        preloadedState: {
          theme: { isDark: true },
        },
      });
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders with light theme', () => {
      const { container } = renderWithProviders(<Skeleton />, {
        preloadedState: {
          theme: { isDark: false },
        },
      });
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('MovieCardSkeleton', () => {
    it('renders movie card skeleton structure', () => {
      const { container } = renderWithProviders(<MovieCardSkeleton />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('GallerySkeleton', () => {
    it('renders default number of skeleton cards', () => {
      const { container } = renderWithProviders(<GallerySkeleton />);
      const skeletonCards = container.querySelectorAll('[class*="movieCardSkeleton"]');
      expect(skeletonCards.length).toBe(10);
    });

    it('renders custom number of skeleton cards', () => {
      const { container } = renderWithProviders(<GallerySkeleton count={5} />);
      const skeletonCards = container.querySelectorAll('[class*="movieCardSkeleton"]');
      expect(skeletonCards.length).toBe(5);
    });
  });
});
