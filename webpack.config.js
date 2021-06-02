const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = function (env = {}) {
    return {
        entry: {
            main: "./src/index.js",
        },
        output: {
            filename: '[name].js',
            path: path.resolve('./dist'),
            publicPath: "/"
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        { loader: "css-loader" }
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ]
                },
                /*loaders added to support font-awesome (or) custom fonts used in application*/
                { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader" },
                { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader" },
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebPackPlugin({
                template: path.resolve('./public', 'index.html'),
            }),
            new MiniCssExtractPlugin({
                filename: "[name].css"
            }),
        ],
        resolve: {
            extensions: ['.js', '.jsx']
        },
        mode: env.production ? 'production' : 'development'
    }
};