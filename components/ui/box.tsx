import { cn } from '@/lib/utils';
import { View, type ViewProps } from 'react-native';

interface BoxProps extends ViewProps {
  className?: string;
}

export function Box({ className, ...props }: BoxProps) {
  return <View className={cn(className)} {...props} />;
}
