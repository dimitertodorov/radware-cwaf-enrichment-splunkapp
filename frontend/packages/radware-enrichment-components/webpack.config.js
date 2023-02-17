const path = require('path');
const { merge } = require('webpack-merge');
const baseComponentConfig = require('@splunk/webpack-configs/component.config').default;

module.exports = merge(baseComponentConfig, {
    entry: {
        RadwareEnrichmentSetupComponent: path.join(__dirname, 'src/components/RadwareEnrichmentSetupComponent.jsx'),
    },
    output: {
        path: path.join(__dirname),
    },
    devServer: {
        disableHostCheck: true,
        allowedHosts: [
            'lvh.me',
            '127.0.0.1',
            'localhost'
        ]
    }
});
