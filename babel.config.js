module.exports = function(api) {
  api.cache(true);
  const presets = ['babel-preset-expo'];
  const plugins = [];

  // Add the dotenv plugin configuration
  if (process.env.NODE_ENV !== 'production') {
    plugins.push(['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
      blacklist: null,
      whitelist: null,
      safe: false,
      allowUndefined: true
    }]);
  }

  return {
    presets: ['babel-preset-expo'],
    plugins
  };
};
