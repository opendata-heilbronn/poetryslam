module.exports = {
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: 'raw-loader'
            }
        ]
    }
};