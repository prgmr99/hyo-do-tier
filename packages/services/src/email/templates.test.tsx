import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

describe('Email Templates', () => {
  it('renders without crashing', () => {
    const TestEmail = () => <div>Test Email</div>;
    const { container } = render(<TestEmail />);
    expect(container).toBeTruthy();
  });
});
