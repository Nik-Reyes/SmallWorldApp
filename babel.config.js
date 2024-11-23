module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [["module:react-native-dotenv",
      {
        moduleName: "@env",    // import variables from '@env'
        path: ".env", 
        blocklist: null,    // You can use blocklist or allowlist if needed
        allowlist: null,
        safe: false,        // Set to true if you want to use dotenv-safe
        allowUndefined: true // Allow undefined variables in your .env
      }
    ]],
    plugins: ["module:react-native-dotenv"],
  };
};
