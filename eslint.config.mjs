// eslint.config.mjs
export default [
  {
    // JS/TS/Vue 파일 전체에 적용
    files: ['**/*.{js,ts,vue}'],
    ignores: ['node_modules/**', '.output/**', '.nuxt/**', 'dist/**'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: 'module',
        extraFileExtensions: ['.vue']
      }
    },
    plugins: {
      vue: 'eslint-plugin-vue',
      '@typescript-eslint': '@typescript-eslint'
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier'
    ],
    rules: {
      // 팀 규칙에 맞춰 조정
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'vue/html-indent': ['warn', 2],
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    },
    settings: {}
  },
  // .vue 파일 전용 설정(템플릿 언어 옵션 등) 필요 시 추가
]
