import {pluginModuleFederation} from '@module-federation/rsbuild-plugin';
import {defineConfig} from '@rsbuild/core';
import {pluginReact} from '@rsbuild/plugin-react';

import {dependencies as deps} from './package.json';

export default defineConfig({
    source: {
        tsconfigPath: './jsconfig.json',
    },
    server: {
        port: 8080,
        strictPort: true,
        headers: {'Access-Control-Allow-Origin': '*'}, // handled by NGINX
    },
    output: {
        assetPrefix: 'auto',
    },
    html: {
        title: 'Mesto',
        meta: {
            viewport: 'width=device-width initial-scale=1.0',
        },
        favicon: './public/favicon.ico',
        appIcon: {
            name: 'Example',
            icons: [
                {src: './public/logo192.png', size: 192},
                {src: './public/logo512.png', size: 512},
            ],
        },
    },
    plugins: [
        pluginReact(),
        pluginModuleFederation({
            name: 'host',
            remotes: {
                '@mesto/mfe/store': 'store@http://localhost:8084/mf-manifest.json',
                '@mesto/mfe/auth': 'auth@http://localhost:8081/mf-manifest.json',
                '@mesto/mfe/profile': 'profile@http://localhost:8082/mf-manifest.json',
                '@mesto/mfe/cards': 'cards@http://localhost:8083/mf-manifest.json',
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
