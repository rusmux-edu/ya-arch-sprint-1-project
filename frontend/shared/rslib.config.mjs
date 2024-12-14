import {pluginReact} from '@rsbuild/plugin-react';
import {defineConfig} from '@rslib/core';

export default defineConfig({
    source: {
        // @ alias does not work in bundleless mode: https://github.com/web-infra-dev/rslib/pull/535
        entry: {
            index: ['./src/**'],
        },
    },
    lib: [{format: 'esm', bundle: false}],
    output: {target: 'web'},
    plugins: [pluginReact()],
});
