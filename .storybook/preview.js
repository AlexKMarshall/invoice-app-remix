import '../app/styles/tailwind.css'

export const parameters = {
  // this easily gets into infinite loops with native elements
  // actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      date: /Date$/,
    },
  },
  darkMode: {
    classTarget: 'html',
    stylePreview: true,
  },
}
