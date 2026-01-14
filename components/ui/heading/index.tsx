import React, { forwardRef, memo } from 'react';
import { H1, H2, H3, H4, H5, H6 } from '@expo/html-elements';
import { Text as RNText, TextProps } from 'react-native';
import { headingStyle } from './styles';
import type { VariantProps } from '@gluestack-ui/nativewind-utils';
import { cssInterop } from 'nativewind';

type IHeadingProps = VariantProps<typeof headingStyle> &
  TextProps & {
    as?: React.ElementType;
  };

cssInterop(H1, { className: 'style' });
cssInterop(H2, { className: 'style' });
cssInterop(H3, { className: 'style' });
cssInterop(H4, { className: 'style' });
cssInterop(H5, { className: 'style' });
cssInterop(H6, { className: 'style' });

const MappedHeading = memo(
  forwardRef<React.ElementRef<typeof RNText>, IHeadingProps>(
    (
      {
        size,
        className,
        isTruncated,
        bold,
        underline,
        strikeThrough,
        sub,
        italic,
        highlight,
        ...props
      },
      ref
    ) => {
      const styleProps = {
        size,
        isTruncated,
        bold,
        underline,
        strikeThrough,
        sub,
        italic,
        highlight,
        class: className,
      };

      switch (size) {
        case '5xl':
        case '4xl':
        case '3xl':
          return (
            <H1
              className={headingStyle(styleProps)}
              {...props}
              // @ts-expect-error
              ref={ref}
            />
          );
        case '2xl':
          return (
            <H2
              className={headingStyle(styleProps)}
              {...props}
              // @ts-expect-error
              ref={ref}
            />
          );
        case 'xl':
          return (
            <H3
              className={headingStyle(styleProps)}
              {...props}
              // @ts-expect-error
              ref={ref}
            />
          );
        case 'lg':
          return (
            <H4
              className={headingStyle(styleProps)}
              {...props}
              // @ts-expect-error
              ref={ref}
            />
          );
        case 'md':
          return (
            <H5
              className={headingStyle(styleProps)}
              {...props}
              // @ts-expect-error
              ref={ref}
            />
          );
        case 'sm':
        case 'xs':
          return (
            <H6
              className={headingStyle(styleProps)}
              {...props}
              // @ts-expect-error
              ref={ref}
            />
          );
        default:
          return (
            <H4
              className={headingStyle(styleProps)}
              {...props}
              // @ts-expect-error
              ref={ref}
            />
          );
      }
    }
  )
);

const Heading = memo(
  forwardRef<React.ElementRef<typeof RNText>, IHeadingProps>(
    ({ className, size = 'lg', as: AsComp, ...props }, ref) => {
      const {
        isTruncated,
        bold,
        underline,
        strikeThrough,
        sub,
        italic,
        highlight,
      } = props;

      if (AsComp) {
        return (
          <AsComp
            className={headingStyle({
              size,
              isTruncated,
              bold,
              underline,
              strikeThrough,
              sub,
              italic,
              highlight,
              class: className,
            })}
            {...props}
          />
        );
      }

      return (
        <MappedHeading className={className} size={size} ref={ref} {...props} />
      );
    }
  )
);

Heading.displayName = 'Heading';

export { Heading };
