import {pluginModuleFederation} from '@module-federation/rsbuild-plugin';
import {defineConfig} from '@rsbuild/core';
import {pluginReact} from '@rsbuild/plugin-react';

import {dependencies as deps} from './package.json';

export default defineConfig({
    source: {
        tsconfigPath: './jsconfig.json',
    },
    server: {
        port: 8083,
        strictPort: true,
        headers: {'Access-Control-Allow-Origin': '*'}, // handled by NGINX
    },
    output: {
        assetPrefix: 'auto',
    },
    plugins: [
        pluginReact(),
        pluginModuleFederation({
            name: 'cards',
            remotes: {
                '@mesto/mfe/store': 'store@http://localhost:8084/mf-manifest.json',
            },
            exposes: {
                './Feed': './src/components/Feed.jsx',
            },
            shared: {
                ...deps,
                react: {singleton: true, requiredVersion: deps.react},
                'react-dom': {singleton: true, requiredVersion: deps['react-dom']},
            },
            dev: {
                disableDynamicRemoteTypeHints: true,
            },
        }),
    ],
});
