export default {
  extends: ['markuplint:recommended'],
  rules: {
    'required-attr': true
  },
  nodeRules: [
    {
      selector: 'script',
      rules: {
        'required-attr': false
      }
    },
    {
      selector: '.svg-sprites',
      rules: {
        'ineffective-attr': false
      }
    }
  ]
};