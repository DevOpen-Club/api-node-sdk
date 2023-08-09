pnpm install

pnpm husky install
pnpm husky add .husky/commit-msg 'pnpm commitlint --edit $1'
pnpm husky add .husky/lint 'pnpm eslint . --fix'
