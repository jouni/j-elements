const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

module.exports = function(config) {
  config.addPlugin(eleventyNavigationPlugin);
  config.addPlugin(syntaxHighlight);

  config.addPassthroughCopy('./docs/src');
  config.addWatchTarget('docs/src');

  config.addPassthroughCopy('./docs/assets');
  config.addWatchTarget('docs/assets');

  config.addPassthroughCopy('./src');
  config.addWatchTarget('src');

  config.setLibrary(
    'md',
    markdownIt({
      html: true,
      breaks: true,
      linkify: true,
      typographer: true
    }).use(markdownItAnchor)
  );

  return {
    dir: {
      input: 'docs/pages',
      output: 'docs/_site',
      includes: '../_includes',
      // layouts: 'layouts',
      // data: 'data'
    },
    // templateFormats: ['njk', 'md', '11ty.js'],
    // htmlTemplateEngine: 'njk',
    // markdownTemplateEngine: 'njk'
  }
};
