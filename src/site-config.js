const config = {
  breakPoints: {
    sm: 767,
    md: 768,
  },
  images: {
    smDir       : '/',
    mdDir       : '/md/',
    retinaSuffix: '@2x',
    optimize: {
      inputDir         : './src/images/',
      outputDir        : './public/',
      format           : 'webp',
      allowedExtensions: ['.jpg', '.png'],
      options: {
        jpg : { quality: 80, progressive: true },
        png : { quality: 80 },
        gif : {},
        svg : {},
        webp: { quality: 80 },
      }
    }
  },
  build: {
    root   : 'htdocs',
    deletes: ['url-list'],
    html: {
      minify      : true,
      relativePath: false,
    },
    css: {
      path          : 'assets/css/style.css',
      minify        : true,
      queryParameter: false,
    },
    js: {
      path          : 'assets/js/bundle.js',
      minify        : true,
      queryParameter: false,
    },
  },
}

export default config
