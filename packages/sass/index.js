/**
 * SASS webpack block.
 *
 * @see https://github.com/jtangelder/sass-loader
 */

module.exports = sass

/**
 * @param {object}   [options]                  See https://github.com/sass/node-sass#options
 * @param {string[]} [options.includePaths]
 * @param {bool}     [options.indentedSyntax]
 * @param {string}   [options.outputStyle]
 * @param {bool}     [options.sourceMap]
 * @return {Function}
 */
function sass (options) {
  options = options || {}

  const hasOptions = Object.keys(options).length > 0

  return (context) => {
    const config = {
      module: {
        loaders: [
          {
            test: context.fileType('text/x-sass'),
            loaders: [
              'style-loader',
              options.sourceMap ? 'css-loader?sourceMap' : 'css-loader',
              hasOptions ? 'sass-loader?' + JSON.stringify(options) : 'sass-loader'
            ]
          }
        ]
      }
    }

    if (options.sourceMap && context.webpackVersion.major >= 2) {
      // Hacky fix for an issue with the sass-loader and webpack@2
      // (see https://github.com/andywer/webpack-blocks/issues/116)

      config.plugins = [
        new context.webpack.LoaderOptionsPlugin({
          options: {
            context: '/'
          }
        })
      ]
    }

    return config
  }
}
