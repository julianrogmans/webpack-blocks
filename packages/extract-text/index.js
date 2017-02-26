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

  return (context, webpackConfig) => {
    const loaderConfig = getLoaderConfigByType(context, webpackConfig, fileType)

    return {
      module: {
        loaders: [
          {
            test: context.fileType(fileType),
            exclude: loaderConfig.exclude,
            loader: createExtractTextLoader(loaderConfig),
            loaders: undefined
          }
        ]
      },
      plugins: [
        new ExtractTextPlugin(outputFilePattern)
      ]
    }
  }
}

function createExtractTextLoader (loaderConfig) {
  if (/^style(-loader)?$/.test(loaderConfig.loaders[0])) {
    return ExtractTextPlugin.extract('style-loader', removeFirst(loaderConfig.loaders))
  } else {
    return ExtractTextPlugin.extract(loaderConfig.loaders)
  }
}

function removeFirst (array) {
  const arrayCopy = [].concat(array)
  arrayCopy.shift()

  return arrayCopy
}
