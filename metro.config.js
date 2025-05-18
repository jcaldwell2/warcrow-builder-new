const { getDefaultConfig } = require('expo/metro-config');

// Get default Expo config
/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Optional: Add file extensions if you use more than standard ones
config.resolver.sourceExts.push('cjs');

module.exports = config;
