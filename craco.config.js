const CracoLessPlugin = require('craco-less');
const path = require("path");
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
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
    webpack: {
        alias: {

            "@": resolve( "src"),
            "@components": resolve( "src/components"),
            "@common": resolve( "src/common"),
            "@utils": resolve( "src/utils"),
            "@api": resolve( "src/api"),
        }
    },
};
