import type { UserConfig } from '@commitlint/types';

const ErrorSeverity = 2;

const Configuration: UserConfig = {

    extends: ['@commitlint/config-conventional'],
    formatter: '@commitlint/format',
    rules: {
        'type-enum': [
                ErrorSeverity,
            'always',
            [
                'docs',
                'feat',
                'fix',
                'perf',
                'refactor',
                'revert',
                'style',
                'test',
                'release',
                'license',
            ],
        ],
        'scope-case': [ErrorSeverity, 'always', 'lower-case'],
        'subject-max-length': [ErrorSeverity, 'always', 100],
        'validate-scope': [ErrorSeverity, 'always'],
    },
    plugins: [
        {
            rules: {
                'validate-scope': c => {
                    // Allow empty scopes for CI and Release types
                    if (!c.scope) return [['release', 'license'].includes(c.type), 'scope must be provided']

                    const allowedScopes = ['arkitect', 'demohouse/*'];

                    // 正则校验：arkitect 或 demohouse/ 开头
                    const isValid = /^(arkitect|demohouse\/.+|mcp\/.+)$/.test(c.scope);
                    return [isValid, `Scope must be one of ${allowedScopes.join(', ')}`];
                },
            }
        }
    ],
    helpUrl: 'https://github.com/volcengine/ai-app-lab/blob/main/docs/commitlint.md',
};

export default Configuration;
