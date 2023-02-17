const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { merge } = require('webpack-merge');

const baseConfig = require('@splunk/webpack-configs/base.config').default;
const FileManagerPlugin = require('filemanager-webpack-plugin');
const webpack = require('webpack');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const {GitRevisionPlugin} = require('git-revision-webpack-plugin')
const gitRevisionPlugin = new GitRevisionPlugin()


// Set up an entry config by iterating over the files in the pages directory.
const entries = fs
    .readdirSync(path.join(__dirname, 'src/main/webapp/pages'))
    .filter((pageFile) => !/^\./.test(pageFile))
    .reduce((accum, page) => {
        accum[page] = path.join(__dirname, 'src/main/webapp/pages', page);
        return accum;
    }, {});
module.exports = merge(baseConfig, {
    entry: entries,
    output: {
        path: path.join(__dirname, 'stage/appserver/static/pages/'),
        filename: '[name].js',
    },
    plugins: [
        new DefinePlugin({
            'BUILT_AT': DefinePlugin.runtimeValue(() => `${JSON.stringify(new Date().toISOString())}`, []),
            '__GIT__VERSION': JSON.stringify(gitRevisionPlugin.version()),
            '__GIT__COMMITHASH': JSON.stringify(gitRevisionPlugin.commithash()),
            '__GIT__BRANCH': JSON.stringify(gitRevisionPlugin.branch()),
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.join(__dirname, 'src/main/resources/splunk'),
                    to: path.join(__dirname, 'stage'),
                },
            ],
        }),
        new FileManagerPlugin({
            events: {
                onEnd: {
                    copy: [
                        {
                            source: path.join(__dirname, 'stage/appserver/static/pages'),
                            destination: path.join(__dirname, '../../../splunkapp/appserver/static/pages')
                        }
                    ]
                }
            }
        })
    ],
    devtool: 'eval-source-map',
    resolve: {
        fallback: {
            querystring: require.resolve("querystring-es3"),
        }

    }
});
