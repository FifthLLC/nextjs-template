# Atomic Design Methodology

## Overview
This project follows Brad Frost's Atomic Design methodology to create a scalable component system.

## Component Hierarchy

### Atoms (`src/shared/components/atoms/`)
**Purpose:** Smallest building blocks of the UI
**Examples:** Button, Input, Text, Icon, Avatar

**Structure:**
```typescript
// atoms/Button/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  // ... other props
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children,
  ...props 
}) => {
  // Implementation
};
```

**Rules:**
- No business logic
- Pure UI components
- Highly reusable
- Well-typed props
- Default export pattern

### Molecules (`src/shared/components/molecules/`)
**Purpose:** Simple combinations of atoms
**Examples:** SearchBox, FormField, Card, Notification

**Structure:**
```typescript
// molecules/SearchBox/SearchBox.tsx
import { Input } from '@shared/components/atoms';
import { Button } from '@shared/components/atoms';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  // ... other props
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  onSearch,
  placeholder = 'Search...',
  ...props
}) => {
  // Combine atoms with simple logic
};
```

**Rules:**
- Combine atoms purposefully
- Minimal business logic
- Focus on UI patterns
- Reusable across features

### Organisms (`src/shared/components/organisms/`)
**Purpose:** Complex components with business logic
**Examples:** Header, Footer, ProductList, UserDashboard

**Structure:**
```typescript
// organisms/Header/Header.tsx
import { useState } from 'react';
import { Button } from '@shared/components/atoms';
import { SearchBox } from '@shared/components/molecules';

interface HeaderProps {
  user?: User;
  onLogout?: () => void;
  // ... other props
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onLogout,
  ...props
}) => {
  // Complex logic and state management
};
```

**Rules:**
- Can contain business logic
- Manage their own state
- Compose atoms and molecules
- Feature-specific variants go in feature folders

## Best Practices

### Component Creation Guidelines
1. **Start Small:** Always create atoms first, then compose upward
2. **Single Responsibility:** Each component should have one clear purpose
3. **Prop Interface:** Always define TypeScript interfaces for props
4. **Default Props:** Provide sensible defaults where appropriate
5. **Composition over Inheritance:** Use composition patterns

### Testing Requirements
- **Atoms:** Test all prop variations and states
- **Molecules:** Test component interactions and user flows
- **Organisms:** Test business logic and complex behaviors

### Storybook Documentation
Every component should have:
- Default story
- All prop variations
- Interactive controls
- Accessibility tests
- Documentation

### When to Create New Components
- **Atom:** Reused 3+ times across different contexts
- **Molecule:** Clear UI pattern that combines multiple atoms
- **Organism:** Complex component with specific business purpose

## Anti-Patterns to Avoid
- ❌ Atoms with business logic
- ❌ Deeply nested component hierarchies
- ❌ Components that are too generic (do everything)
- ❌ Skipping component levels (organism directly using atoms without molecules)
- ❌ Feature-specific components in shared folders 