module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@styles': './src/styles',
          '@types': './src/types',
          '@lib': './src/lib',
          '@graphqlQueries': './src/graphql/queries',
          '@graphqlMutations': './src/graphql/mutations',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
}
