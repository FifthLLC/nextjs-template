import { Button as HeroUIButton } from '@heroui/react';
import type { ButtonProps as HeroUIButtonProps } from '@heroui/react';
import type { ReactNode } from 'react';

export interface ButtonProps extends Omit<HeroUIButtonProps, 'variant' | 'size' | 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  loading?: boolean;
}

const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  loading = false,
  ...props
}: ButtonProps) => {
  // Map custom variants to HeroUI variants
  const getHeroUIVariant = (customVariant: string) => {
    switch (customVariant) {
      case 'primary':
        return 'solid';
      case 'secondary':
        return 'flat';
      case 'outline':
        return 'bordered';
      case 'danger':
        return 'solid';
      default:
        return 'solid';
    }
  };

  // Map custom variants to HeroUI colors
  const getHeroUIColor = (customVariant: string) => {
    switch (customVariant) {
      case 'primary':
        return 'primary';
      case 'secondary':
        return 'default';
      case 'outline':
        return 'default';
      case 'danger':
        return 'danger';
      default:
        return 'primary';
    }
  };

  return (
    <HeroUIButton
      variant={getHeroUIVariant(variant)}
      color={getHeroUIColor(variant)}
      size={size}
      isLoading={loading}
      {...props}
    >
      {children}
    </HeroUIButton>
  );
};

export default Button;
