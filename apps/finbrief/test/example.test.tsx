import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Test Setup', () => {
  it('renders a basic element', () => {
    render(<div data-testid="test">Hello</div>);
    expect(screen.getByTestId('test')).toHaveTextContent('Hello');
  });

  it('jest-dom matchers work', () => {
    render(<button disabled>Click me</button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
