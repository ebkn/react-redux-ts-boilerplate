'use strict';

module.exports = (baseConfig, env, config) => {
  config.module.rules = [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },
    {
      test: /\.stories\.tsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/env',
              {
                'targets': {
                  'browsers': [
                    '>0.25%',
                    'not ie 11',
                    'not op_mini all',
                  ],
                },
              },
            ],
            '@babel/react',
            '@babel/typescript',
          ],
          plugins: [
            '@babel/proposal-class-properties',
            '@babel/proposal-object-rest-spread',
          ],
        },
      },
    },
    {
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
      ],
    },
  ];
  config.resolve.extensions = ['.ts', '.tsx', '.js', '.css'];
  return config;
};
