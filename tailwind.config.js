/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // React Native Reusables color tokens
        border: '#E0E0E0',
        input: '#E0E0E0',
        ring: '#65558f',
        background: '#EFEFEF',
        foreground: '#161D1B',
        destructive: {
          DEFAULT: '#BA1A1A',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#E8E8E8',
          foreground: '#3F4946',
        },
        accent: {
          DEFAULT: '#E8E8E8',
          foreground: '#161D1B',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#161D1B',
        },
        // Material Design 3 Color Tokens (Light Theme)
        // Primary - Teal/Green accent for walking/health theme
        primary: {
          DEFAULT: '#65558f',
          foreground: '#FFFFFF',
          container: '#9CF2E4',
          on: '#FFFFFF',
          'on-container': '#00201C',
        },
        secondary: {
          DEFAULT: '#4A635E',
          foreground: '#FFFFFF',
          container: '#CCE8E2',
          on: '#FFFFFF',
          'on-container': '#06201C',
        },
        tertiary: {
          DEFAULT: '#456179',
          container: '#CCE5FF',
          on: '#FFFFFF',
          'on-container': '#001E31',
        },
        error: {
          DEFAULT: '#BA1A1A',
          container: '#FFDAD6',
          on: '#FFFFFF',
          'on-container': '#410002',
        },
        surface: {
          DEFAULT: '#EFEFEF',
          dim: '#E0E0E0',
          bright: '#F5F5F5',
          'container-lowest': '#FFFFFF',
          'container-low': '#F5F5F5',
          container: '#EFEFEF',
          'container-high': '#E8E8E8',
          'container-highest': '#E0E0E0',
        },
        'on-surface': '#161D1B',
        'on-surface-variant': '#3F4946',
        outline: '#6F7976',
        'outline-variant': '#BEC9C5',
        inverse: {
          surface: '#2B3230',
          'on-surface': '#ECF2EF',
          primary: '#80D5C8',
        },
        // Additional utility colors
        scrim: '#000000',
        shadow: '#000000',
      },
      borderRadius: {
        // MD3 shape tokens
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '28px',
        'full': '9999px',
      },
      fontSize: {
        // MD3 Typography scale
        'display-large': ['57px', { lineHeight: '64px', letterSpacing: '-0.25px' }],
        'display-medium': ['45px', { lineHeight: '52px', letterSpacing: '0px' }],
        'display-small': ['36px', { lineHeight: '44px', letterSpacing: '0px' }],
        // Custom large typography for minimal design
        'stat-huge': ['72px', { lineHeight: '80px', letterSpacing: '-1px', fontWeight: '300' }],
        'stat-large': ['56px', { lineHeight: '64px', letterSpacing: '-0.5px', fontWeight: '300' }],
        'stat-unit': ['20px', { lineHeight: '28px', letterSpacing: '0px', fontWeight: '400' }],
        'headline-large': ['32px', { lineHeight: '40px', letterSpacing: '0px' }],
        'headline-medium': ['28px', { lineHeight: '36px', letterSpacing: '0px' }],
        'headline-small': ['24px', { lineHeight: '32px', letterSpacing: '0px' }],
        'title-large': ['22px', { lineHeight: '28px', letterSpacing: '0px' }],
        'title-medium': ['16px', { lineHeight: '24px', letterSpacing: '0.15px', fontWeight: '500' }],
        'title-small': ['14px', { lineHeight: '20px', letterSpacing: '0.1px', fontWeight: '500' }],
        'body-large': ['16px', { lineHeight: '24px', letterSpacing: '0.5px' }],
        'body-medium': ['14px', { lineHeight: '20px', letterSpacing: '0.25px' }],
        'body-small': ['12px', { lineHeight: '16px', letterSpacing: '0.4px' }],
        'label-large': ['14px', { lineHeight: '20px', letterSpacing: '0.1px', fontWeight: '500' }],
        'label-medium': ['12px', { lineHeight: '16px', letterSpacing: '0.5px', fontWeight: '500' }],
        'label-small': ['11px', { lineHeight: '16px', letterSpacing: '0.5px', fontWeight: '500' }],
      },
      boxShadow: {
        // MD3 elevation levels
        'elevation-1': '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
        'elevation-2': '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
        'elevation-3': '0px 1px 3px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
        'elevation-4': '0px 2px 3px rgba(0, 0, 0, 0.3), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)',
        'elevation-5': '0px 4px 4px rgba(0, 0, 0, 0.3), 0px 8px 12px 6px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
