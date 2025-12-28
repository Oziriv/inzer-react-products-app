import antfu from '@antfu/eslint-config'
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'

export default antfu(
  {
    ignores: [],
    react: true,
    stylistic: {
      overrides: {
        'style/jsx-self-closing-comp': ['warn', {
          component: true,
          html: true,
        }],
      },
    },
    typescript: {
      tsconfigPath: 'tsconfig.json',
    },
    formatters: {
      html: true,
      css: true,
      markdown: 'prettier',
    },
    isInEditor: false,
    // javascript: {
    //   overrides: {
    //     'unused-imports/no-unused-vars': ['error', {
    //       args: 'after-used',
    //       argsIgnorePattern: '^_',
    //       ignoreRestSiblings: false,
    //       vars: 'all',
    //       varsIgnorePattern: '^_',
    //     }],
    //   },
    // },
  },
  {
    plugins: {
      'better-tailwindcss': eslintPluginBetterTailwindcss,
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: './src/app/styles/index.css',
      },
    },
    rules: {
      ...eslintPluginBetterTailwindcss.configs['recommended-warn'].rules,
      'better-tailwindcss/enforce-consistent-line-wrapping': ['off', { printWidth: 120 }],
      // TODO: посмотреть решение в issue когда появятся (buttonVariants)
      // 'react-refresh/only-export-components': 'off',
    },
  },
)
