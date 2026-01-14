import { cn } from '@/lib/utils';
import { View, type ViewProps } from 'react-native';

const spaceMap = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
  xl: 'gap-6',
} as const;

interface HStackProps extends ViewProps {
  className?: string;
  space?: keyof typeof spaceMap;
}

export function HStack({ className, space, ...props }: HStackProps) {
  return (
    <View
      className={cn('flex-row', space && spaceMap[space], className)}
      {...props}
    />
  );
}
