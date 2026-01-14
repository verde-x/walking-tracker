import { cn } from '@/lib/utils';
import { View, type ViewProps } from 'react-native';

interface CenterProps extends ViewProps {
  className?: string;
}

export function Center({ className, ...props }: CenterProps) {
  return (
    <View
      className={cn('items-center justify-center', className)}
      {...props}
    />
  );
}
