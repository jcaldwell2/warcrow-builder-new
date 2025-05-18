const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configure the Metro bundler
config.resolver = {
  ...config.resolver,
  sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs'],
  assetExts: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'ttf'],
  // Enable symlinks for better module resolution
  enableSymlinks: true,
  // Add additional module paths
  nodeModulesPaths: ['./node_modules'],
  // Add alias for expo/dom/global
  extraNodeModules: {
    'expo/dom/global': require.resolve('expo/build/dom/global')
  }
};

// Configure the transformer
config.transformer = {
  ...config.transformer,
  minifierPath: require.resolve('metro-minify-terser'),
  minifierConfig: {
    compress: {
      reduce_vars: true,
      inline: true
    },
    mangle: true
  },
  // Enable async import/export
  asyncRequireModulePath: require.resolve('metro-runtime/src/modules/asyncRequire'),
  // Enable experimental features
  experimentalImportSupport: true
};

module.exports = config;