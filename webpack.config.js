const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

// The webpack configuration for the client dev server
module.exports = [
    // Server (compile only)
    {
        mode: 'development',
        entry: './src/server/index.js',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'server.js'
        },
        target: 'async-node',
        externals: [nodeExternals()],
        watchOptions: {
            ignored: /node_modules/,
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    resolve: {
                        extensions: ['.js']
                    },
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env'
                            ]
                        }
                    }
                },
            ],
        },
    },
    // Client
    {
        mode: 'development',
        entry: './src/client/index.js',
        output: {
            path: path.resolve(__dirname, 'build', 'public'),
            filename: 'client.js'
        },
        devtool: 'eval-source-map',
        devServer: {
            open: true,
            // So nodemon can watch the server file
            devMiddleware: {
                // Make sure to filter out hot reload files
                writeToDisk: (filePath) => {
                    return !/hot-update/i.test(filePath); // you can change it to whatever you need
                }
            },
            // Proxy requests from localhost to the server
            proxy: {
                '/': `http://localhost:3000`
            },
            static: {
                directory: path.join(__dirname, 'build'),
            },
        },
        // Setup react/babel: https://medium.com/age-of-awareness/setup-react-with-webpack-and-babel-5114a14a47e9
        module: {
            rules: [
                // Image files
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'assets/[name].[ext]'
                            }
                        }
                    ]
                },
                // Javascript and React
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    // Make import statements not require .jsx
                    resolve: {
                        extensions: ['.js', '.jsx']
                    },
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                // Runtime 'automatic' needed so we can exclude import React statements in jsx files
                                ['@babel/preset-react', {runtime: 'automatic'}]
                            ]
                        }
                    }
                },
                // SCSS
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Translates CSS into CommonJS
                        'css-loader',
                        // Compiles Sass to CSS
                        'sass-loader'
                    ]
                }
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/client/index.html'
            })
        ]
    }
]