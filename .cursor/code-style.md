# Code Style & Quality

## Tools
- **Biome:** Primary linter and formatter (replaces ESLint + Prettier)
- **TypeScript:** Strict mode enabled for type safety

## Code Formatting Rules

### JavaScript/TypeScript Style
- **Indentation:** 2 spaces
- **Quotes:** Single quotes for strings, double quotes for JSX attributes
- **Semicolons:** Always required
- **Line Width:** 100 characters maximum
- **Trailing Commas:** ES5 style (objects, arrays)
- **Arrow Parentheses:** As needed (omit for single parameters)

### Example:
```typescript
// ✅ Good
const handleClick = (event: MouseEvent) => {
  console.log('Button clicked');
};

const user = {
  name: 'John',
  email: 'john@example.com',
};

// ❌ Bad
const handleClick = ( event: MouseEvent ) => {
    console.log("Button clicked")
}

const user = {
  name: "John",
  email: "john@example.com"
}
```

## Import Organization
**CRITICAL RULE: NEVER use relative imports. Always use absolute imports with path aliases.**

Biome automatically organizes imports in this order:
1. React and Next.js imports
2. External library imports (alphabetical)
3. Internal imports using path aliases (absolute imports only)
4. CSS imports (always last)

### Example:
```typescript
// ✅ Correct import order
import React from 'react';
import { NextPage } from 'next';

import { Button } from '@heroui/react';
import { useQuery } from '@tanstack/react-query';

import { api } from '@infrastructure/api';
import { Button } from '@shared/components/atoms';

import { LocalComponent } from './LocalComponent';

import './styles.css';
```

## Linting Rules

### Enabled Rules
- **Correctness:** No unused variables (warn)
- **Suspicious:** No explicit any (warn), array index keys allowed
- **Complexity:** forEach allowed
- **Performance:** Delete operator allowed
- **A11y:** Disabled (handled by Storybook addon)

### Code Quality Commands
```bash
# Check code style
pnpm codestyle

# Fix code style issues
pnpm codestyle:fix
```

## TypeScript Guidelines

### Type Definitions
```typescript
// ✅ Interface for props
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

// ✅ Type for union types
type Status = 'loading' | 'success' | 'error';

// ✅ Generic types
interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}
```

### Avoid `any`
```typescript
// ❌ Bad
const handleData = (data: any) => {
  // ...
};

// ✅ Good
const handleData = (data: unknown) => {
  // Type guard or assertion
  if (typeof data === 'object' && data !== null) {
    // ...
  }
};

// ✅ Better - define proper type
interface UserData {
  id: string;
  name: string;
  email: string;
}

const handleData = (data: UserData) => {
  // ...
};
```

## File Organization

### Component Files
```typescript
// ComponentName.tsx
import React from 'react';

// Types should be defined in the same file or imported
interface ComponentNameProps {
  // props definition
}

// Main component with proper typing
export const ComponentName: React.FC<ComponentNameProps> = ({
  // props destructuring
}) => {
  // component implementation
};

// Default export for easier imports
export default ComponentName;
```

### Utility Files
```typescript
// utilityName.ts
// Pure functions with proper typing
export const formatDate = (date: Date): string => {
  // implementation
};

// Constants
export const API_ENDPOINTS = {
  USERS: '/api/users',
  POSTS: '/api/posts',
} as const;
```

## Git Integration
Biome respects:
- `.gitignore` files
- VCS integration enabled
- Pre-commit hooks compatibility

## Ignored Files
The following files/folders are ignored by Biome:
- `node_modules`
- `dist`, `build`, `coverage`
- `public`
- `*.config.js/ts/cjs`
- `src/shared/generated` (API generated code) 