import antfu from '@antfu/eslint-config';
import type { ConfigNames, TypedFlatConfigItem } from '@antfu/eslint-config';
import type { FlatConfigComposer } from 'eslint-flat-config-utils';

const commonPerfectionistSortOptions = Object.freeze({
    ignoreCase: false,
    partitionByNewLine: true,
    type: 'natural',
});

export function createConfig(environment: 'bun' | 'node' = 'node', options?: Parameters<typeof antfu>[0]): FlatConfigComposer<TypedFlatConfigItem, ConfigNames> {
    return antfu(
        { typescript: true, ...options },
        {
            files: ['**/*.{cjs,js,mjs,ts}'],
            rules: {
                'antfu/curly': 'off',
                'antfu/if-newline': 'off',
                'antfu/no-top-level-await': 'off',
                'curly': ['error', 'multi-line'],
                'max-classes-per-file': ['error', 1],
                'perfectionist/sort-array-includes': ['error', commonPerfectionistSortOptions],
                'perfectionist/sort-enums': ['error', commonPerfectionistSortOptions],
                'perfectionist/sort-heritage-clauses': ['error', { ignoreCase: false, type: 'natural' }],
                'perfectionist/sort-imports': [
                    'error',
                    {
                        environment,
                        groups: [
                            ['builtin', 'external'],
                            'internal',
                            'parent',
                            'sibling',
                        ],
                        ignoreCase: false,
                        internalPattern: ['^#.*', '^@/.*', '^~/.*'],
                        type: 'natural',
                    },
                ],
                'perfectionist/sort-interfaces': ['error', commonPerfectionistSortOptions],
                'perfectionist/sort-intersection-types': ['error', commonPerfectionistSortOptions],
                'perfectionist/sort-maps': ['error', commonPerfectionistSortOptions],
                'perfectionist/sort-object-types': ['error', commonPerfectionistSortOptions],
                'perfectionist/sort-objects': ['error', commonPerfectionistSortOptions],
                'perfectionist/sort-sets': ['error', commonPerfectionistSortOptions],
                'perfectionist/sort-switch-case': ['error', { ignoreCase: false, type: 'natural' }],
                'perfectionist/sort-union-types': ['error', commonPerfectionistSortOptions],
                'perfectionist/sort-variable-declarations': ['error', commonPerfectionistSortOptions],
                'style/array-bracket-newline': ['error', 'consistent'],
                'style/array-element-newline': ['error', 'consistent'],
                'style/arrow-parens': ['error', 'always'],
                'style/brace-style': ['error', '1tbs', { allowSingleLine: false }],
                'style/function-call-spacing': ['error', 'never'],
                'style/indent': ['error', 4],
                'style/member-delimiter-style': ['error', { multiline: { delimiter: 'semi', requireLast: true } }],
                'style/no-extra-parens': ['error', 'all', { nestedBinaryExpressions: false }],
                'style/no-extra-semi': 'error',
                'style/padding-line-between-statements': [
                    'error',
                    { blankLine: 'always', next: ['class', 'enum', 'function'], prev: '*' },
                    { blankLine: 'always', next: '*', prev: ['class', 'function'] },
                ],
                'style/semi': ['error', 'always'],
                'ts/consistent-generic-constructors': ['error', 'constructor'],
                'ts/no-redeclare': 'off',
            },
        },
        {
            files: ['**/.vscode/*.json'],
            rules: {
                'jsonc/sort-array-values': ['error', { order: { natural: true, type: 'asc' }, pathPattern: '^.*$' }],
                'jsonc/sort-keys': ['error', 'asc', { caseSensitive: true, natural: true }],
            },
        },
    );
}

export const bun = createConfig('bun');
export const node = createConfig('node');
