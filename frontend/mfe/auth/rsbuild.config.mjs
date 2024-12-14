import {pluginModuleFederation} from '@module-federation/rsbuild-plugin';
import {defineConfig} from '@rsbuild/core';
import {pluginReact} from '@rsbuild/plugin-react';

import {dependencies} from './package.json';

export default defineConfig({
    source: {
        tsconfigPath: './jsconfig.json',
    },
    server: {
        port: 8081,
        strictPort: true,
        headers: {'Access-Control-Allow-Origin': '*'}, // handled by NGINX
    },
    output: {
        assetPrefix: 'auto',
    },
    plugins: [
        pluginReact(),
        pluginModuleFederation({
            name: 'auth',
            remotes: {
                '@mesto/mfe/store': 'store@http://localhost:8084/mf-manifest.json',
            },
            exposes: {
                './Register': './src/components/Register.jsx',
                './Login': './src/components/Login.jsx',
            },
            shared: {
                ...dependencies,
                react: {singleton: true, requiredVersion: dependencies.react},
                'react-dom': {singleton: true, requiredVersion: dependencies['react-dom']},
                'react-router-dom': {singleton: true, requiredVersion: dependencies['react-router-dom']},
            },
            dev: {
                disableDynamicRemoteTypeHints: true,
            },
        }),
    ],
});
