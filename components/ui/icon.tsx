import { View, ViewProps } from 'react-native';
import { cssInterop } from 'nativewind';

const StyledView = cssInterop(View, { className: 'style' });

export interface IconProps extends ViewProps {
  as: React.ComponentType<{ size?: number; color?: string }>;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  color?: string;
  className?: string;
}

const iconSizes = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
  '2xl': 32,
};

export function Icon({
  as: IconComponent,
  size = 'md',
  color = '#000000',
  className,
  ...props
}: IconProps) {
  return (
    <StyledView className={className} {...props}>
      <IconComponent size={iconSizes[size]} color={color} />
    </StyledView>
  );
}
