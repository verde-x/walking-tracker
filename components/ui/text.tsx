import { cn } from '@/lib/utils';
import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

interface TextProps extends RNTextProps {
  className?: string;
}

export function Text({ className, ...props }: TextProps) {
  return <RNText className={cn(className)} {...props} />;
}
