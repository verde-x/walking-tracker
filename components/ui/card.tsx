import { cn } from '@/lib/utils';
import { View, type ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  className?: string;
  variant?: 'filled' | 'elevated' | 'outline';
}

const variantStyles = {
  filled: 'bg-surface-container',
  elevated: 'bg-surface-container-low shadow-elevation-1',
  outline: 'border border-outline-variant bg-surface',
} as const;

export function Card({ className, variant = 'filled', ...props }: CardProps) {
  return (
    <View
      className={cn('rounded-xl p-4', variantStyles[variant], className)}
      {...props}
    />
  );
}
