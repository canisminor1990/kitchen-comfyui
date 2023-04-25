module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-config-clean-order'],
  plugins: ['stylelint-order'],
  rules: {
    'declaration-block-no-duplicate-properties': null,
  },
  overrides: [
    {
      files: ['*.less', '*.css'],
      customSyntax: 'postcss-less',
      rules: {
        'no-descending-specificity': null,
      },
    },
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      customSyntax: 'postcss-styled-syntax',
      rules: {
        'block-no-empty': null,
      },
    },
  ],
}
