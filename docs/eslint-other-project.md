package.json

```
"devDependencies": {
    "@antfu/eslint-config": "^6.2.0",
    "@commitlint/cli": "^20.1.0",
    "@commitlint/config-conventional": "^20.0.0",
    "@commitlint/types": "^20.0.0",
    "@iconify-json/ep": "^1.2.3",
    "@semantic-release/changelog": "^6.0.3",
    "@semantic-release/exec": "^7.1.0",
    "@semantic-release/git": "^10.0.1",
    "@semantic-release/gitlab": "^13.2.9",
    "@tsconfig/node-lts": "^24.0.0",
    "@types/eslint-plugin-tailwindcss": "^3.17.0",
    "@types/node": "^24.10.1",
    "@vitejs/plugin-vue": "^6.0.2",
    "@vue/tsconfig": "^0.8.1",
    "autoprefixer": "^10.4.22",
    "commitizen": "^4.3.1",
    "conventional-changelog-conventionalcommits": "^9.1.0",
    "cz-conventional-changelog": "^3.3.0",
    "eslint": "^9.39.1",
    "eslint-formatter-gitlab": "^7.0.0",
    "eslint-plugin-format": "^1.0.2",
    "eslint-plugin-tailwindcss": "^3.18.2",
    "husky": "^9.1.7",
    "jiti": "^2.6.1",
    "lint-staged": "^16.2.7",
    "npm-run-all2": "^8.0.4",
    "postcss": "^8.5.6",
    "postcss-import": "^16.1.1",
    "postcss-load-config": "^6.0.1",
    "sass-embedded": "^1.93.3",
    "semantic-release": "^25.0.2",
    "tailwindcss": "^3.4.18",
    "typescript": "~5.9.3",
    "unplugin-auto-import": "^20.3.0",
    "unplugin-icons": "^22.5.0",
    "unplugin-vue-components": "^30.0.0",
    "vite": "^7.2.6",
    "vite-plugin-vue-devtools": "^8.0.5",
    "vue-tsc": "^3.1.5"
  }
```

eslint.config.ts

```
import antfu from '@antfu/eslint-config'
import tailwindcssPlugin from 'eslint-plugin-tailwindcss'

export default antfu(
  {
    ignores: ['.pnpm-store'],
    stylistic: true,
    isInEditor: false,
    formatters: {
      html: true,
      css: true,
      markdown: true,
    },
    markdown: true,
    javascript: {
      overrides: {
        'unused-imports/no-unused-vars': ['error', {
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: false,
          vars: 'all',
          varsIgnorePattern: '^_',
        }],
      },
    },
    typescript: {
      // Включает type-aware (нужно будет типизировать абсолютно всё)
      // tsconfigPath: 'tsconfig.json',
      overrides: {
        'ts/no-non-null-assertion': 'error',
        // TODO: Убрать когда будет готов baseApiService
        // 'ts/explicit-function-return-type': 'error',
        // TODO: Добавить после обсуждения правил с тимлидом
        // 'ts/naming-convention': ['error',
        //   {
        //     "selector": "default",
        //     "format": ["camelCase"]
        //   },
        //   ...
        // ]
      },
    },
    vue: {
      overrides: {
        'vue/component-name-in-template-casing': ['error', 'PascalCase', {
          registeredComponentsOnly: false,
          ignores: ['apexchart'],
        }],
        'vue/max-attributes-per-line': ['error', {
          singleline: 1,
          multiline: { max: 1 },
        }],
        'vue/attributes-order': ['error', {
          alphabetical: true,
        }],
        'vue/singleline-html-element-content-newline': ['error', {
          ignoreWhenNoAttributes: false,
          ignores: ['pre', 'textarea'],
        }],
      },
    },
  },
  // Дополнительная настройка проекта
  ...(tailwindcssPlugin.configs['flat/recommended'] as any),
  {
    rules: {
      // TODO: Изменить на 'error' когда будет готов UI-kit
      'tailwindcss/no-custom-classname': 'off',
    },
  },
)
```
