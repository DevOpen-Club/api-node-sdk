pnpm install

pnpm husky install
pnpm husky add .husky/lint 'pnpm eslint . --fix'

cd examples
pnpm link ..
