/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* Border gray */
        input: "var(--color-input)", /* Elevated surface color */
        ring: "var(--color-ring)", /* Deep purple */
        background: "var(--color-background)", /* Rich dark base */
        foreground: "var(--color-foreground)", /* High contrast white */
        primary: {
          DEFAULT: "var(--color-primary)", /* Deep purple */
          foreground: "var(--color-primary-foreground)", /* High contrast white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* Lighter purple variant */
          foreground: "var(--color-secondary-foreground)", /* High contrast white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* Clear red */
          foreground: "var(--color-destructive-foreground)", /* High contrast white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* Border gray */
          foreground: "var(--color-muted-foreground)", /* Muted gray */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* Success green */
          foreground: "var(--color-accent-foreground)", /* High contrast white */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* Elevated surface color */
          foreground: "var(--color-popover-foreground)", /* High contrast white */
        },
        card: {
          DEFAULT: "var(--color-card)", /* Elevated surface color */
          foreground: "var(--color-card-foreground)", /* High contrast white */
        },
        success: {
          DEFAULT: "var(--color-success)", /* Darker green */
          foreground: "var(--color-success-foreground)", /* High contrast white */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* Amber orange */
          foreground: "var(--color-warning-foreground)", /* High contrast white */
        },
        error: {
          DEFAULT: "var(--color-error)", /* Clear red */
          foreground: "var(--color-error-foreground)", /* High contrast white */
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '240': '60rem',
      },
      zIndex: {
        '100': '100',
        '200': '200',
        '1000': '1000',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      animation: {
        "fade-in": "fadeIn 200ms ease-out",
        "slide-up": "slideUp 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}