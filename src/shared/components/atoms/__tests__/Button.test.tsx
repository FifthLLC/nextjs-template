import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '@shared/components/atoms/Button';
import type { ReactNode } from 'react';

interface MockButtonProps {
  children: ReactNode;
  variant?: string;
  color?: string;
  size?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  [key: string]: unknown; // For other HTML attributes
}

// Mock HeroUI Button component
jest.mock('@heroui/react', () => ({
  Button: ({
    children,
    variant,
    color,
    size,
    isLoading,
    isDisabled,
    onClick,
    ...props
  }: MockButtonProps) => (
    <button
      onClick={onClick}
      disabled={isDisabled}
      data-testid="hero-button"
      data-variant={variant}
      data-color={color}
      data-size={size}
      data-loading={isLoading}
      {...props}
    >
      {isLoading && <span data-testid="loading-spinner">Loading...</span>}
      {children}
    </button>
  ),
}));

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Default Button</Button>);

    const button = screen.getByTestId('hero-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Default Button');
    expect(button).toHaveAttribute('data-variant', 'solid');
    expect(button).toHaveAttribute('data-color', 'primary');
    expect(button).toHaveAttribute('data-size', 'md');
  });

  it('renders with custom children content', () => {
    render(<Button>Custom Text</Button>);

    expect(screen.getByText('Custom Text')).toBeInTheDocument();
  });

  describe('Variant mapping', () => {
    it('maps primary variant correctly', () => {
      render(<Button variant="primary">Primary</Button>);

      const button = screen.getByTestId('hero-button');
      expect(button).toHaveAttribute('data-variant', 'solid');
      expect(button).toHaveAttribute('data-color', 'primary');
    });

    it('maps secondary variant correctly', () => {
      render(<Button variant="secondary">Secondary</Button>);

      const button = screen.getByTestId('hero-button');
      expect(button).toHaveAttribute('data-variant', 'flat');
      expect(button).toHaveAttribute('data-color', 'default');
    });

    it('maps outline variant correctly', () => {
      render(<Button variant="outline">Outline</Button>);

      const button = screen.getByTestId('hero-button');
      expect(button).toHaveAttribute('data-variant', 'bordered');
      expect(button).toHaveAttribute('data-color', 'default');
    });

    it('maps danger variant correctly', () => {
      render(<Button variant="danger">Danger</Button>);

      const button = screen.getByTestId('hero-button');
      expect(button).toHaveAttribute('data-variant', 'solid');
      expect(button).toHaveAttribute('data-color', 'danger');
    });
  });

  describe('Size prop', () => {
    it('renders with small size', () => {
      render(<Button size="sm">Small</Button>);

      const button = screen.getByTestId('hero-button');
      expect(button).toHaveAttribute('data-size', 'sm');
    });

    it('renders with medium size (default)', () => {
      render(<Button size="md">Medium</Button>);

      const button = screen.getByTestId('hero-button');
      expect(button).toHaveAttribute('data-size', 'md');
    });

    it('renders with large size', () => {
      render(<Button size="lg">Large</Button>);

      const button = screen.getByTestId('hero-button');
      expect(button).toHaveAttribute('data-size', 'lg');
    });
  });

  describe('Loading state', () => {
    it('shows loading state when loading prop is true', () => {
      render(<Button loading>Loading Button</Button>);

      const button = screen.getByTestId('hero-button');
      expect(button).toHaveAttribute('data-loading', 'true');
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    it('does not show loading state when loading prop is false', () => {
      render(<Button loading={false}>Normal Button</Button>);

      const button = screen.getByTestId('hero-button');
      expect(button).toHaveAttribute('data-loading', 'false');
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    it('shows loading state with custom variant', () => {
      render(
        <Button variant="danger" loading>
          Loading Danger
        </Button>
      );

      const button = screen.getByTestId('hero-button');
      expect(button).toHaveAttribute('data-loading', 'true');
      expect(button).toHaveAttribute('data-variant', 'solid');
      expect(button).toHaveAttribute('data-color', 'danger');
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });
  });

  describe('Disabled state', () => {
    it('is disabled when isDisabled prop is true', () => {
      render(<Button isDisabled>Disabled Button</Button>);

      const button = screen.getByTestId('hero-button');
      expect(button).toBeDisabled();
    });

    it('is not disabled when isDisabled prop is false', () => {
      render(<Button isDisabled={false}>Enabled Button</Button>);

      const button = screen.getByTestId('hero-button');
      expect(button).not.toBeDisabled();
    });
  });

  describe('Click handling', () => {
    it('calls onClick handler when clicked', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Clickable Button</Button>);

      const button = screen.getByTestId('hero-button');
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
      const handleClick = jest.fn();
      render(
        <Button onClick={handleClick} isDisabled>
          Disabled Button
        </Button>
      );

      const button = screen.getByTestId('hero-button');
      fireEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('passes through additional props', () => {
      render(
        <Button data-custom="test-value" aria-label="Custom Button" className="custom-class">
          Custom Button
        </Button>
      );

      const button = screen.getByTestId('hero-button');
      expect(button).toHaveAttribute('data-custom', 'test-value');
      expect(button).toHaveAttribute('aria-label', 'Custom Button');
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('Complex scenarios', () => {
    it('handles loading state with different variants and sizes', () => {
      const { rerender } = render(
        <Button variant="primary" size="sm" loading>
          Loading Small Primary
        </Button>
      );

      let button = screen.getByTestId('hero-button');
      expect(button).toHaveAttribute('data-variant', 'solid');
      expect(button).toHaveAttribute('data-color', 'primary');
      expect(button).toHaveAttribute('data-size', 'sm');
      expect(button).toHaveAttribute('data-loading', 'true');

      rerender(
        <Button variant="outline" size="lg" loading>
          Loading Large Outline
        </Button>
      );

      button = screen.getByTestId('hero-button');
      expect(button).toHaveAttribute('data-variant', 'bordered');
      expect(button).toHaveAttribute('data-color', 'default');
      expect(button).toHaveAttribute('data-size', 'lg');
      expect(button).toHaveAttribute('data-loading', 'true');
    });

    it('maintains accessibility with loading and disabled states', () => {
      render(
        <Button loading isDisabled aria-describedby="help-text" role="button">
          Complex Button
        </Button>
      );

      const button = screen.getByTestId('hero-button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('data-loading', 'true');
      expect(button).toHaveAttribute('aria-describedby', 'help-text');
      expect(button).toHaveAttribute('role', 'button');
    });
  });

  describe('TypeScript interface compliance', () => {
    it('accepts all valid variant types', () => {
      const variants: Array<'primary' | 'secondary' | 'outline' | 'danger'> = [
        'primary',
        'secondary',
        'outline',
        'danger',
      ];

      variants.forEach(variant => {
        const { unmount } = render(<Button variant={variant}>{variant}</Button>);
        expect(screen.getByText(variant)).toBeInTheDocument();
        unmount();
      });
    });

    it('accepts all valid size types', () => {
      const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

      sizes.forEach(size => {
        const { unmount } = render(<Button size={size}>{size}</Button>);
        expect(screen.getByText(size)).toBeInTheDocument();
        unmount();
      });
    });
  });
});
