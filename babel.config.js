const plugins = [
  [
    "@babel/plugin-proposal-decorators",
    {
      legacy: true,
    },
  ],
  ["@babel/plugin-proposal-optional-catch-binding"],
  "react-native-reanimated/plugin", // NOTE: this must be last in the plugins
]

const vanillaConfig = {
  presets: ["module:metro-react-native-babel-preset"],
  env: {
    production: {},
  },
  plugins,
}

const babelConfig =  vanillaConfig

module.exports = babelConfig
