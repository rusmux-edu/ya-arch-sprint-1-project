import {pluginModuleFederation} from '@module-federation/rsbuild-plugin';
import {defineConfig} from '@rsbuild/core';
import {pluginReact} from '@rsbuild/plugin-react';

import {dependencies as deps} from './package.json';

export default defineConfig({
    source: {
        tsconfigPath: './jsconfig.json',
    },
    server: {
        port: 8082,
        strictPort: true,
        headers: {'Access-Control-Allow-Origin': '*'}, // handled by NGINX
    },
    output: {
        assetPrefix: 'auto',
    },
    plugins: [
        pluginReact(),
        pluginModuleFederation({
            name: 'profile',
            remotes: {
                '@mesto/mfe/store': 'store@http://localhost:8084/mf-manifest.json',
            },
            exposes: {
                './Profile': './src/components/Profile.jsx',
            },
            shared: {
                ...deps,
                react: {singleton: true, requiredVersion: deps.react},
                'react-dom': {singleton: true, requiredVersion: deps['react-dom']},
                'react-router-dom': {singleton: true, requiredVersion: deps['react-router-dom']},
            },
            dev: {
                disableDynamicRemoteTypeHints: true,
            },
        }),
    ],
});
