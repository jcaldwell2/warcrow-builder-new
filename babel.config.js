// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Remove the deprecated expo-router/babel plugin
    plugins: []
  };
};