/**
 * Extract-text webpack block.
 *
 * @see https://github.com/webpack/extract-text-webpack-plugin
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const getLoaderConfigByType = require('@webpack-blocks/webpack-common').getLoaderConfigByType

module.exports = extractText

/**
 * @param {string}  outputFilePattern
 * @param {string}  [fileType]          A MIME type used for file matching. Defaults to `text/css`.
 * @return {Function}
 */
function extractText (outputFilePattern, fileType) {
  outputFilePattern = outputFilePattern || 'css/[name].[contenthash:8].css'
  fileType = fileType || 'text/css'

  const plugin = new ExtractTextPlugin(outputFilePattern)

  return (context, webpackConfig) => {
    const loaderConfig = getLoaderConfigByType(context, webpackConfig, fileType)

    return {
      module: {
        loaders: [
          {
            test: context.fileType(fileType),
            exclude: loaderConfig.exclude,
            loader: createExtractTextLoader(loaderConfig, plugin),
            loaders: undefined
          }
        ]
      },
      plugins: [ plugin ]
    }
  }
}

function createExtractTextLoader (loaderConfig, plugin) {
  if (/^style(-loader)?$/.test(loaderConfig.loaders[0])) {
    return plugin.extract({
      fallback: 'style-loader',
      use: removeFirst(loaderConfig.loaders)
    })
  } else {
    return plugin.extract({
      use: loaderConfig.loaders
    })
  }
}

function removeFirst (array) {
  const arrayCopy = [].concat(array)
  arrayCopy.shift()

  return arrayCopy
}
