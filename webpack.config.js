import NodePolyfillPlugin from  "node-polyfill-webpack-plugin"
import TerserPlugin from "terser-webpack-plugin"
import { resolve } from 'path';

export default {
  entry: "./index.js",
  output: {
    path: resolve('.'),
    filename: "bundle.js",
    library: {
      type: 'module'
    },
  },
  experiments: {
    outputModule: true,
  },
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: {
        condition: /^\**!|@license/i,
        filename: 'LICENSE',
        banner: false,
      },
      terserOptions: {
        ecma: 2020,
      }
    })],
    moduleIds: "named",
    chunkIds: "named",
  },
  plugins: [new NodePolyfillPlugin()],
  resolve: {
    alias: {
      "graceful-fs": "fs",
    },
    fallback: {
      fs: false,
      module: false,
    },
  },
}
