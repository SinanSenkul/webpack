const path = require("path");
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: "production",
    entry: "./src/index.js",
    output: {
        filename: 'main.[hash].bundle.js',
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: 'imgs/[name].[hash].[ext]'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCSSExtractPlugin({ filename: "[name].[hash].css" }),
    ],
    optimization: {
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            new CssMinimizerPlugin(),
            new TerserPlugin(),
            new HtmlWebpackPlugin({
                template: './src/template.html',
                minify:{
                    removeAttributeQuotes: true,
                    removeComments: true,
                    collapseWhitespace: true
                }
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            },
        ]
    }
})