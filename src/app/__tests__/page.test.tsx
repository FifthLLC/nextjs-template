import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import Home from '../page';

interface UseQueryStateOptions {
  withDefault?: (value: string) => { withDefault: () => string };
}

interface MockImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  [key: string]: unknown; // For other HTML attributes
}

interface MockButtonProps {
  children: ReactNode;
  as?: string;
  href?: string;
  startContent?: ReactNode;
  [key: string]: unknown; // For other HTML attributes
}

interface MockInputProps {
  value?: string;
  onValueChange?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  isClearable?: boolean;
  [key: string]: unknown; // For other HTML attributes
}

interface MockSelectProps {
  children: ReactNode;
  selectedKeys?: string[];
  onSelectionChange?: (keys: Set<string>) => void;
  [key: string]: unknown; // For other HTML attributes
}

interface MockSelectItemProps {
  children: ReactNode;
  [key: string]: unknown; // For other HTML attributes
}

interface MockCardProps {
  children: ReactNode;
  [key: string]: unknown; // For other HTML attributes
}

interface MockDividerProps {
  [key: string]: unknown; // For other HTML attributes
}

interface MockLinkProps {
  children: ReactNode;
  href?: string;
  showAnchorIcon?: boolean;
  [key: string]: unknown; // For other HTML attributes
}

// Mock nuqs to avoid ESM issues in Jest
jest.mock('nuqs', () => ({
  useQueryState: jest.fn((_key: string, options?: UseQueryStateOptions) => {
    const defaultValue = options?.withDefault ? options.withDefault('') : '';
    return [defaultValue, jest.fn()];
  }),
  parseAsString: {
    withDefault: (defaultValue: string) => ({ withDefault: () => defaultValue }),
  },
  parseAsStringEnum: (_values: string[]) => ({
    withDefault: (defaultValue: string) => ({ withDefault: () => defaultValue }),
  }),
  NuqsAdapter: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, width, height, ...props }: MockImageProps) {
    return (
      <img src={src} alt={alt} width={width} height={height} {...props} data-testid="next-image" />
    );
  };
});

// Mock HeroUI components
jest.mock('@heroui/react', () => ({
  Button: ({
    children,
    as: Component = 'button',
    href,
    startContent,
    ...props
  }: MockButtonProps) => {
    const { startContent: _, ...restProps } = props;
    if (Component === 'a' || href) {
      return (
        <a href={href} {...restProps} data-testid="hero-button">
          {startContent && <span data-testid="button-start-content">{startContent}</span>}
          {children}
        </a>
      );
    }
    return (
      <button {...restProps} data-testid="hero-button">
        {startContent && <span data-testid="button-start-content">{startContent}</span>}
        {children}
      </button>
    );
  },
  Input: ({
    value,
    onValueChange,
    onClear,
    placeholder,
    isClearable,
    ...props
  }: MockInputProps) => (
    <input
      value={value}
      onChange={e => onValueChange?.(e.target.value)}
      placeholder={placeholder}
      {...props}
      data-testid="hero-input"
    />
  ),
  Select: ({ children, selectedKeys, onSelectionChange, ...props }: MockSelectProps) => (
    <select
      value={selectedKeys?.[0] || ''}
      onChange={e => onSelectionChange?.(new Set([e.target.value]))}
      {...props}
      data-testid="hero-select"
    >
      {children}
    </select>
  ),
  SelectItem: ({ children, ...props }: MockSelectItemProps) => (
    <option {...props} data-testid="hero-select-item">
      {children}
    </option>
  ),
  Card: ({ children, ...props }: MockCardProps) => (
    <div {...props} data-testid="hero-card">
      {children}
    </div>
  ),
  CardBody: ({ children, ...props }: MockCardProps) => (
    <div {...props} data-testid="hero-card-body">
      {children}
    </div>
  ),
  CardHeader: ({ children, ...props }: MockCardProps) => (
    <div {...props} data-testid="hero-card-header">
      {children}
    </div>
  ),
  Chip: ({ children, ...props }: MockCardProps) => (
    <span {...props} data-testid="hero-chip">
      {children}
    </span>
  ),
  Divider: (props: MockDividerProps) => <hr {...props} data-testid="hero-divider" />,
  Link: ({ children, href, showAnchorIcon, ...props }: MockLinkProps) => {
    const { showAnchorIcon: _, ...restProps } = props;
    return (
      <a href={href} {...restProps} data-testid="hero-link">
        {children}
      </a>
    );
  },
}));

describe('Home Component', () => {
  beforeEach(() => {
    render(<Home />);
  });

  describe('Layout and Structure', () => {
    it('renders the main container with correct classes', () => {
      const mainElement = screen.getByRole('main');
      expect(mainElement).toBeInTheDocument();
      expect(mainElement).toHaveClass(
        'flex',
        'flex-col',
        'gap-8',
        'row-start-2',
        'items-center',
        'sm:items-start',
        'max-w-2xl'
      );
    });

    it('renders the footer with correct structure', () => {
      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass(
        'row-start-3',
        'flex',
        'gap-6',
        'flex-wrap',
        'items-center',
        'justify-center'
      );
    });
  });

  describe('Header Section', () => {
    it('renders the Next.js logo with correct attributes', () => {
      const nextLogo = screen.getByAltText('Next.js logo');
      expect(nextLogo).toBeInTheDocument();
      expect(nextLogo).toHaveAttribute('src', '/next.svg');
      expect(nextLogo).toHaveAttribute('width', '180');
      expect(nextLogo).toHaveAttribute('height', '38');
    });

    it('renders the HeroUI chip', () => {
      const chip = screen.getByTestId('hero-chip');
      expect(chip).toBeInTheDocument();
      expect(chip).toHaveTextContent('+ HeroUI');
    });
  });

  describe('Main Card Content', () => {
    it('renders the card with header and body', () => {
      const cards = screen.getAllByTestId('hero-card');
      const cardHeaders = screen.getAllByTestId('hero-card-header');
      const cardBodies = screen.getAllByTestId('hero-card-body');

      expect(cards[0]).toBeInTheDocument();
      expect(cardHeaders[0]).toBeInTheDocument();
      expect(cardBodies[0]).toBeInTheDocument();
    });

    it('renders the welcome heading', () => {
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Welcome to Next.js with HeroUI!');
    });

    it('renders the divider', () => {
      const dividers = screen.getAllByTestId('hero-divider');
      expect(dividers[0]).toBeInTheDocument();
    });

    it('renders all instruction list items', () => {
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(3);

      expect(listItems[0]).toHaveTextContent(/Get started by editing.*src\/app\/page\.tsx/);
      expect(listItems[1]).toHaveTextContent('Save and see your changes instantly.');
      expect(listItems[2]).toHaveTextContent('Now with beautiful HeroUI components! 🎉');
    });

    it('renders the code element with correct styling', () => {
      const codeElement = screen.getByText('src/app/page.tsx');
      expect(codeElement).toBeInTheDocument();
      expect(codeElement.tagName).toBe('CODE');
    });
  });

  describe('Action Buttons', () => {
    it('renders the Deploy button with correct link and content', () => {
      const deployButton = screen.getByRole('link', { name: /deploy now/i });
      expect(deployButton).toBeInTheDocument();
      expect(deployButton).toHaveAttribute(
        'href',
        'https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
      );
      expect(deployButton).toHaveAttribute('target', '_blank');
      expect(deployButton).toHaveAttribute('rel', 'noopener noreferrer');
      expect(deployButton).toHaveTextContent('Deploy now');
    });

    it('renders the Vercel logo in deploy button', () => {
      const vercelLogo = screen.getByAltText('Vercel logomark');
      expect(vercelLogo).toBeInTheDocument();
      expect(vercelLogo).toHaveAttribute('src', '/vercel.svg');
      expect(vercelLogo).toHaveAttribute('width', '20');
      expect(vercelLogo).toHaveAttribute('height', '20');
    });

    it('renders the HeroUI Docs button with correct link', () => {
      const heroUIButton = screen.getByRole('link', { name: /heroui docs/i });
      expect(heroUIButton).toBeInTheDocument();
      expect(heroUIButton).toHaveAttribute('href', 'https://heroui.com/docs');
      expect(heroUIButton).toHaveAttribute('target', '_blank');
      expect(heroUIButton).toHaveAttribute('rel', 'noopener noreferrer');
      expect(heroUIButton).toHaveTextContent('HeroUI Docs');
    });
  });

  describe('Footer Links', () => {
    it('renders the Learn link with correct attributes', () => {
      const learnLink = screen.getByRole('link', { name: /learn/i });
      expect(learnLink).toBeInTheDocument();
      expect(learnLink).toHaveAttribute(
        'href',
        'https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
      );
      expect(learnLink).toHaveAttribute('target', '_blank');
      expect(learnLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders the file icon in Learn link', () => {
      const fileIcon = screen.getByAltText('File icon');
      expect(fileIcon).toBeInTheDocument();
      expect(fileIcon).toHaveAttribute('src', '/file.svg');
      expect(fileIcon).toHaveAttribute('width', '16');
      expect(fileIcon).toHaveAttribute('height', '16');
    });

    it('renders the Examples link with correct href', () => {
      const examplesLink = screen.getByRole('link', { name: /examples/i });
      expect(examplesLink).toBeInTheDocument();
      expect(examplesLink).toHaveAttribute('href', 'https://heroui.com');
      expect(examplesLink).toHaveAttribute('target', '_blank');
      expect(examplesLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders the Next.js link with correct href', () => {
      const nextjsLink = screen.getByRole('link', { name: /go to nextjs\.org/i });
      expect(nextjsLink).toBeInTheDocument();
      expect(nextjsLink).toHaveAttribute(
        'href',
        'https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
      );
      expect(nextjsLink).toHaveAttribute('target', '_blank');
      expect(nextjsLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      const headings = screen.getAllByRole('heading');
      expect(headings).toHaveLength(2);
      expect(headings[0].tagName).toBe('H1');
      expect(headings[1].tagName).toBe('H2');
    });

    it('has accessible links with proper labels', () => {
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAccessibleName();
      });
    });

    it('has images with proper alt text', () => {
      const images = screen.getAllByRole('img');
      images.forEach(image => {
        expect(image).toHaveAttribute('alt');
        expect(image.getAttribute('alt')).not.toBe('');
      });
    });
  });

  describe('Content Accuracy', () => {
    it('displays all expected text content', () => {
      expect(screen.getByText('Welcome to Next.js with HeroUI!')).toBeInTheDocument();
      expect(screen.getByText('+ HeroUI')).toBeInTheDocument();
      expect(screen.getByText('Deploy now')).toBeInTheDocument();
      expect(screen.getByText('HeroUI Docs')).toBeInTheDocument();
      expect(screen.getByText('Learn')).toBeInTheDocument();
      expect(screen.getByText('Examples')).toBeInTheDocument();
      expect(screen.getByText('Go to nextjs.org')).toBeInTheDocument();
    });

    it('has correct number of external links', () => {
      const externalLinks = screen.getAllByRole('link');
      // Should have: Deploy, HeroUI Docs, Learn, Examples, and Go to nextjs.org
      expect(externalLinks).toHaveLength(5);
    });
  });
});
