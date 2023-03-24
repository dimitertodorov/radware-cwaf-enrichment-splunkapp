const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {merge} = require('webpack-merge')
const DefinePlugin = require("webpack/lib/DefinePlugin")
const baseConfig = require('@splunk/webpack-configs/base.config').default
const {GitRevisionPlugin} = require('git-revision-webpack-plugin')
const gitRevisionPlugin = new GitRevisionPlugin()
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(baseConfig, {
    entry: path.join(__dirname, 'demo'),
    plugins: [
        new DefinePlugin({
            'BUILT_AT': DefinePlugin.runtimeValue(() => `${JSON.stringify(new Date().toISOString())}`, []),
            '__GIT__VERSION': JSON.stringify(gitRevisionPlugin.version()),
            '__GIT__COMMITHASH': JSON.stringify(gitRevisionPlugin.commithash()),
            '__GIT__BRANCH': JSON.stringify(gitRevisionPlugin.branch()),
        }),
        new HtmlWebpackPlugin({
            hash: true,
            template: path.join(__dirname, 'standalone/index.html'),
        }),
        new CopyWebpackPlugin({
            patterns: [
                path.join(__dirname, 'standalone/local_setup.js')
            ]
        }),
    ],
    devtool: 'eval-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, '../../../../splunkapp/appserver/static'),
            publicPath: '/static/app/radware_cwaf_enrichment'
        },
        allowedHosts: [
            'lvh.me',
            '127.0.0.1',
            'localhost'
        ]
    },
    resolve: {
        fallback: {
            querystring: require.resolve("querystring-es3"),
        }
    }
})
