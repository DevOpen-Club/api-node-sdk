tsc --module ES2015 --outDir es
tsc --module CommonJS --outDir lib
tsc --declaration --emitDeclarationOnly --declarationDir typings
