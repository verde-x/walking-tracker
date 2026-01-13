import { View, ViewProps } from 'react-native';
import { cssInterop } from 'nativewind';

const StyledView = cssInterop(View, { className: 'style' });

export interface CardProps extends ViewProps {
  className?: string;
  variant?: 'elevated' | 'outline' | 'ghost' | 'filled';
}

const variantClasses = {
  elevated: 'bg-white rounded-xl shadow-md',
  outline: 'bg-white rounded-xl border border-gray-200',
  ghost: 'bg-transparent rounded-xl',
  filled: 'bg-gray-100 rounded-xl',
};

export function Card({ className, variant = 'elevated', ...props }: CardProps) {
  return (
    <StyledView
      className={`${variantClasses[variant]} ${className || ''}`}
      {...props}
    />
  );
}
