import { View, ViewProps } from 'react-native';
import { cssInterop } from 'nativewind';

const StyledView = cssInterop(View, { className: 'style' });

export interface VStackProps extends ViewProps {
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

export function VStack({
  className,
  space = 'md',
  reversed = false,
  ...props
}: VStackProps) {
  return (
    <StyledView
      className={`flex-col ${reversed ? 'flex-col-reverse' : ''} ${spaceClasses[space]} ${className || ''}`}
      {...props}
    />
  );
}
