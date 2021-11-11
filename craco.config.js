const CracoLessPlugin = require('craco-less');
const path = require('path')

module.exports = {
    webpack: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@share": path.resolve(__dirname, "./src/share"),
            "@mocks": path.resolve(__dirname, "./src/mocks"),
            "@static": path.resolve(__dirname, "./src/static"),
            "@containers": path.resolve(__dirname, "./src/containers"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@common": path.resolve(__dirname, "./src/compoenet"),
        }
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#0770c1' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
