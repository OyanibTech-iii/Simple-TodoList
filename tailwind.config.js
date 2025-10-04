/* tailwind.config.js */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'vermilion': {
          50: 'hsl(var(--vermilion-50) / <alpha-value>)',
          100: 'hsl(var(--vermilion-100) / <alpha-value>)',
          200: 'hsl(var(--vermilion-200) / <alpha-value>)',
          300: 'hsl(var(--vermilion-300) / <alpha-value>)',
          400: 'hsl(var(--vermilion-400) / <alpha-value>)',
          500: 'hsl(var(--vermilion-500) / <alpha-value>)',
          600: 'hsl(var(--vermilion-600) / <alpha-value>)',
          700: 'hsl(var(--vermilion-700) / <alpha-value>)',
          800: 'hsl(var(--vermilion-800) / <alpha-value>)',
          900: 'hsl(var(--vermilion-900) / <alpha-value>)',
          950: 'hsl(var(--vermilion-950) / <alpha-value>)',
        }
      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', '1rem'],
        'sm': ['0.875rem', '1.25rem'],
        'base': ['1rem', '1.5rem'],
        'lg': ['1.125rem', '1.75rem'],
        'xl': ['1.25rem', '1.75rem'],
        '2xl': ['1.5rem', '2rem'],
        '3xl': ['1.875rem', '2.25rem'],
        '4xl': ['2.25rem', '2.5rem'],
        '5xl': ['3rem', '1'],
        '6xl': ['3.75rem', '1'],
        '7xl': ['4.5rem', '1'],
        '8xl': ['6rem', '1'],
        '9xl': ['8rem', '1'],
      }
    }
  },
  plugins: [],
};
