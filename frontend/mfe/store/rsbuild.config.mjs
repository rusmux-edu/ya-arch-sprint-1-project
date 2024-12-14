import {pluginModuleFederation} from '@module-federation/rsbuild-plugin';
import {defineConfig} from '@rsbuild/core';
import {pluginReact} from '@rsbuild/plugin-react';

import {dependencies as deps} from './package.json';

export default defineConfig({
    source: {
        tsconfigPath: './jsconfig.json',
    },
    server: {
        port: 8084,
        strictPort: true,
        headers: {'Access-Control-Allow-Origin': '*'}, // handled by NGINX
    },
    output: {
        assetPrefix: 'auto',
    },
    plugins: [
        pluginReact(),
        pluginModuleFederation({
            name: 'store',
            exposes: {
                './userStore': './src/store/userStore.js',
            },
            shared: {
                ...deps,
                react: {singleton: true, requiredVersion: deps.react},
                'react-dom': {singleton: true, requiredVersion: deps['react-dom']},
                zustand: {singleton: true, requiredVersion: deps.zustand},
            },
            dev: {
                disableDynamicRemoteTypeHints: true,
            },
        }),
    ],
});
