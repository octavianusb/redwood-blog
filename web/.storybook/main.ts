import type { StorybookConfig } from 'storybook-framework-redwoodjs-vite';

import { getPaths, importStatementPath } from '@redwoodjs/project-config';

const redwoodProjectPaths = getPaths();

const config: StorybookConfig = {
    framework: 'storybook-framework-redwoodjs-vite',

    stories: [
        `${importStatementPath(redwoodProjectPaths.web.src)}/**/*.stories.@(js|jsx|ts|tsx|mdx)`,
    ],

    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-viewport',
        '@storybook/addon-actions',
        '@storybook/addon-backgrounds',
        '@storybook/addon-toolbars',
        '@storybook/addon-outline',
        '@storybook/addon-controls',
        '@storybook/addon-measure',
    ],
};

export default config;
