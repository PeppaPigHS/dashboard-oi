const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  corePlugins: {
    preflight: true,
  },
  purge: {
    enabled: process.env.NODE_ENV !== 'development',
    content: ['./src/**/*.ts', './src/**/*.tsx'],
    options: {
      defaultExtractor: (content) => content.match(/[\w-/.:]+(?<!:)/g) || [],
    },
  },
  theme: {
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      display: [
        'Inter var',
        'SF Pro Display',
        'Sukhumvit Set',
        'Kanit',
        ...defaultTheme.fontFamily.sans,
      ],
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/custom-forms'),
    function ({ addBase, addComponents, theme }) {
      addBase([
        {
          '@font-face': {
            fontFamily: 'Inter var',
            fontWeight: '100 900',
            fontStyle: 'normal',
            fontNamedInstance: 'Regular',
            fontDisplay: 'swap',
            src: 'url("/fonts/Inter-roman.var.woff2?3.13") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Inter var',
            fontWeight: '100 900',
            fontStyle: 'italic',
            fontNamedInstance: 'Italic',
            fontDisplay: 'swap',
            src: 'url("/fonts/Inter-italic.var.woff2?3.13") format("woff2")',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Kanit',
            fontStyle: 'normal',
            fontWeight: '400',
            fontDisplay: 'swap',
            src:
              "local('Kanit Regular'), local('Kanit-Regular'), url('https://fonts.gstatic.com/s/kanit/v5/nKKZ-Go6G5tXcraBGwCKd6xBDFs.woff2') format('woff2')",
            unicodeRange: 'U+0E01-0E5B, U+200C-200D, U+25CC',
          },
          '@font-face': {
            fontFamily: 'Sukhumvit Set',
            fontDisplay: 'swap',
            src: "local('Sukhumvit Set')",
            unicodeRange: 'U+0E01-0E5B, U+200C-200D, U+25CC',
          },
        },
      ])
    },
  ],
}
