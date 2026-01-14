'use client';
import React from 'react';
import { View } from 'react-native';
import { tva } from '@gluestack-ui/nativewind-utils/tva';
import type { VariantProps } from '@gluestack-ui/nativewind-utils';
import type { LucideIcon } from 'lucide-react-native';

const iconStyle = tva({
  base: 'fill-none',
  variants: {
    size: {
      '2xs': 'h-3 w-3',
      'xs': 'h-3.5 w-3.5',
      'sm': 'h-4 w-4',
      'md': 'h-[18px] w-[18px]',
      'lg': 'h-5 w-5',
      'xl': 'h-6 w-6',
    },
  },
});

const iconSizes: Record<string, number> = {
  '2xs': 12,
  'xs': 14,
  'sm': 16,
  'md': 18,
  'lg': 20,
  'xl': 24,
};

type IIconProps = React.ComponentProps<typeof View> &
  VariantProps<typeof iconStyle> & {
    as: LucideIcon | React.ComponentType<{ size?: number; color?: string }>;
    size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    color?: string;
    className?: string;
  };

const Icon = React.forwardRef<React.ElementRef<typeof View>, IIconProps>(
  ({ as: IconComponent, size = 'md', color, className, ...props }, ref) => {
    const iconSize = typeof size === 'string' ? iconSizes[size] : size;

    return (
      <View
        ref={ref}
        className={iconStyle({ size, class: className })}
        {...props}
      >
        <IconComponent size={iconSize} color={color} />
      </View>
    );
  }
);

Icon.displayName = 'Icon';

export { Icon };
