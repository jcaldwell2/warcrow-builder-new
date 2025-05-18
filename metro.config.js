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

// Configure module resolution
config.resolver.resolverMainFields = [
  'browser',
  'module',
  'main',
];

// Handle module resolution
config.resolver.extraNodeModules = new Proxy({}, {
  get: (target, name) => path.join(process.cwd(), `node_modules/${name}`),
});

// Ensure proper transformation of files
config.transformer = {
  ...config.transformer,
  unstable_allowRequireContext: true,
  // Only include this line if you have react-native-svg-transformer installed
  // babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

// Add project root and node_modules to watch folders
config.watchFolders = [
  path.resolve(__dirname),
  path.resolve(__dirname, 'node_modules'),
];

// IMPORTANT: Completely disable cache to fix the store.get issue
// This is the most important part for fixing your error
config.cacheStores = [];
config.cacheVersion = Date.now().toString();

// Configure server
config.server = {
  ...config.server,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      // Ensure proper CORS headers for web
      res.setHeader('Access-Control-Allow-Origin', '*');
      return middleware(req, res, next);
    };
  },
};

module.exports = config;