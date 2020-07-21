const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');


const file = {
    js: 'public/extensions/custom/modules/deploy/module.js',
    css: 'public/extensions/custom/modules/deploy/module.css',
    meta: 'public/extensions/custom/modules/deploy/meta.json',
    script: 'public/extensions/custom/modules/deploy/deploy.sh',
    hooks: 'public/extensions/custom/hooks/deploy-hooks.php',
    endpoints: 'public/extensions/custom/endpoints/deploy-endpoints.php'
};


module.exports = {

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },

    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: file.css
        }),
        new CopyPlugin({
            patterns: [
                {from: 'src/module/meta.json', to: file.meta},
                {from: 'src/module/deploy.sh', to: file.script},
                {from: 'src/hooks.php', to: file.hooks},
                {from: 'src/endpoints.php', to: file.endpoints}
            ],
        }),
    ],

    output: {
        library: '__DirectusExtension__',
        libraryTarget: 'umd',
        filename: file.js
    },

    entry: './src/module/module.vue',
    devtool: 'source-map'

}

