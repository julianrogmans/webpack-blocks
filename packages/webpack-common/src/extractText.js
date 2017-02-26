/**
 * Extract-text webpack block.
 *
 * @see https://github.com/webpack/extract-text-webpack-plugin
 */

export {
  getLoaderConfigByType
}

/**
 * @param {object}  context
 * @param {object}  webpackConfig
 * @param {string}  fileType
 * @return {object}
 * @throws {Error}
 */
function getLoaderConfigByType (context, webpackConfig, fileType) {
  const loaderConfig = webpackConfig.module.loaders.find(
    // using string-based comparison here, since webpack-merge tends to deep-cloning things
    (loader) => String(loader.test) === String(context.fileType(fileType))
  )

  if (!loaderConfig) {
    throw new Error(`${fileType} loader could not be found in webpack config.`)
  } else if (!loaderConfig.loaders || loaderConfig.loaders.length === 0) {
    throw new Error(`No loaders set up for ${fileType}.`)
  } else {
    return loaderConfig
  }
}
