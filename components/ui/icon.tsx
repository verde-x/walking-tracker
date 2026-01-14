import type { LucideIcon } from 'lucide-react-native';
import type { ViewProps } from 'react-native';

const sizeMap = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;

interface IconProps extends ViewProps {
  as: LucideIcon;
  size?: keyof typeof sizeMap;
  color?: string;
  className?: string;
}

export function Icon({ as: IconComponent, size = 'md', color = '#000', className }: IconProps) {
  return <IconComponent size={sizeMap[size]} color={color} className={className} />;
}
