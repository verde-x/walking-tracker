import { cn } from '@/lib/utils';
import { View, type ViewProps } from 'react-native';

const spaceMap = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
  xl: 'gap-6',
} as const;

interface VStackProps extends ViewProps {
  className?: string;
  space?: keyof typeof spaceMap;
}

export function VStack({ className, space, ...props }: VStackProps) {
  return (
    <View
      className={cn('flex-col', space && spaceMap[space], className)}
      {...props}
    />
  );
}
