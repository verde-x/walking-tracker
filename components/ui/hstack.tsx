import { View, ViewProps } from 'react-native';
import { cssInterop } from 'nativewind';

const StyledView = cssInterop(View, { className: 'style' });

export interface HStackProps extends ViewProps {
  className?: string;
  space?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  reversed?: boolean;
}

const spaceClasses = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
  xl: 'gap-6',
};

export function HStack({
  className,
  space = 'md',
  reversed = false,
  ...props
}: HStackProps) {
  return (
    <StyledView
      className={`flex-row items-center ${reversed ? 'flex-row-reverse' : ''} ${spaceClasses[space]} ${className || ''}`}
      {...props}
    />
  );
}
