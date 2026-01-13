# Testing Guide

This project uses **Vitest** and **React Testing Library** for testing.

## 🚀 Getting Started

### Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## 📁 Test Structure

Tests are located next to their corresponding components:

```
src/
├── components/
│   ├── UI/
│   │   ├── Button/
│   │   │   ├── index.tsx
│   │   │   └── Button.test.tsx
│   │   ├── ErrorMessage/
│   │   │   ├── index.tsx
│   │   │   └── ErrorMessage.test.tsx
│   │   └── Skeleton/
│   │       ├── index.tsx
│   │       └── Skeleton.test.tsx
│   └── containers/
│       └── MovieGallery/
│           ├── FilterButtons/
│           │   ├── index.tsx
│           │   └── FilterButtons.test.tsx
│           ├── MovieGrid/
│           │   ├── index.tsx
│           │   └── MovieGrid.test.tsx
│           └── EmptyState/
│               ├── index.tsx
│               └── EmptyState.test.tsx
└── test/
    ├── setup.ts          # Test setup and global mocks
    ├── utils.tsx         # Testing utilities and custom render
    └── mockData.ts       # Mock data for tests
```

## 🛠️ Testing Utilities

### Custom Render Function

Use `renderWithProviders` to render components with Redux store and Router:

```typescript
import { renderWithProviders, screen } from '../../../test/utils';

test('renders component', () => {
  renderWithProviders(<MyComponent />);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
```

### With Custom State

```typescript
renderWithProviders(<MyComponent />, {
  preloadedState: {
    theme: { isDark: true },
    movies: { movies: mockMovies, loading: false }
  }
});
```

## 📝 Writing Tests

### Basic Component Test

```typescript
import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '../../../test/utils';
import { Button } from './index';

describe('Button Component', () => {
  it('renders button with children', () => {
    renderWithProviders(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### Testing User Interactions

```typescript
import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen, userEvent } from '../../../test/utils';

describe('Button Component', () => {
  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    renderWithProviders(<Button onClick={handleClick}>Click</Button>);

    await user.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Testing with Mock Data

```typescript
import { mockMovie, mockMovies } from '../../../test/mockData';

test('renders movie card', () => {
  renderWithProviders(<MovieCard movie={mockMovie} />);
  expect(screen.getByText('The Matrix')).toBeInTheDocument();
});
```

## 🎯 Test Coverage

Current test coverage:
- **Button**: 100%
- **ErrorMessage**: 100%
- **Skeleton**: 100%
- **FilterButtons**: 100%
- **MovieGrid**: 100%
- **EmptyState**: 100%

## 📚 Best Practices

1. **Test User Behavior**: Focus on what users see and do, not implementation details
2. **Use `screen` queries**: Prefer `screen.getByText()` over `container.querySelector()`
3. **Async operations**: Always use `await` with `userEvent` and async queries
4. **Mock external dependencies**: Mock API calls, timers, and browser APIs
5. **Test accessibility**: Use role-based queries when possible

## 🔧 Configuration

### vitest.config.ts

```typescript
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
```

### Global Mocks

The following are mocked globally in `src/test/setup.ts`:
- `window.matchMedia`
- `IntersectionObserver`
- `navigator.share`

## 📊 Coverage Reports

After running tests with coverage, open the HTML report:

```bash
npm run test:coverage
open coverage/index.html
```

## 🐛 Debugging Tests

### Run specific test file

```bash
npm test Button.test.tsx
```

### Run specific test

```bash
npm test -t "renders button with children"
```

### Debug in VS Code

Add this configuration to `.vscode/launch.json`:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Vitest Tests",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["run", "test"],
  "console": "integratedTerminal"
}
```

## 📖 Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [Common Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
