import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { cssInterop } from 'nativewind';

const StyledText = cssInterop(RNText, { className: 'style' });

export interface HeadingProps extends RNTextProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}

const sizeClasses = {
  xs: 'text-xs font-bold',
  sm: 'text-sm font-bold',
  md: 'text-base font-bold',
  lg: 'text-lg font-bold',
  xl: 'text-xl font-bold',
  '2xl': 'text-2xl font-bold',
  '3xl': 'text-3xl font-bold',
  '4xl': 'text-4xl font-bold',
};

export function Heading({ className, size = 'lg', ...props }: HeadingProps) {
  return (
    <StyledText
      className={`${sizeClasses[size]} ${className || ''}`}
      {...props}
    />
  );
}
