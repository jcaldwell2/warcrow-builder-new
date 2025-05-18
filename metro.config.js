const { getDefaultConfig } = require('expo/metro-config');
const path = require('node:path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // Enable CSS support for web
  isCSSEnabled: true,
});

// Add all file extensions used in the project
config.resolver.sourceExts = [
  'js',
  'jsx',
  'json',
  'ts',
  'tsx',
  'cjs',
  'mjs',
  // Add native extensions for when they're needed
  'android.js',
  'android.tsx',
  'ios.js',
  'ios.tsx',
];

// Ensure proper transformation of files
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('react-native-babel-transformer'),
};

// Add project root to watch folders
config.watchFolders = [
  path.resolve(__dirname, '.'),
  path.resolve(__dirname, 'node_modules'),
];

module.exports = config;