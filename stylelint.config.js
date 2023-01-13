module.exports = {
  extends: ['stylelint-config-recommended'],
  plugins: [
    'stylelint-selector-bem-pattern'
  ],
  rules: {
    /* common */
    'at-rule-no-unknown': null,
    'font-family-no-missing-generic-family-keyword': null,
    'no-descending-specificity': null,
    'no-duplicate-selectors': null,
    'property-no-unknown': [true, {
      ignoreProperties: ['lg', 'md', 'sm', 'xs']
    }],
    'selector-class-pattern': null,
    'selector-pseudo-class-no-unknown': [true, {
      ignorePseudoClasses: ['global']
    }],
    /* plugins */
    'plugin/selector-bem-pattern': {
      preset: 'bem',
      utilitySelectors: '^.u-[a-z]+$'
    }
  }
}
