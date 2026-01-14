import { cn } from '@/lib/utils';
import { Text, type TextProps } from 'react-native';

interface HeadingProps extends TextProps {
  className?: string;
}

export function Heading({ className, ...props }: HeadingProps) {
  return (
    <Text
      className={cn('text-2xl font-bold text-on-surface', className)}
      {...props}
    />
  );
}
