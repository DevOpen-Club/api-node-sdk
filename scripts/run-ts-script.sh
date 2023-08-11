if [ $# -ne 1 ]; then
  echo [ERROR] 命令需要 1 个参数作为脚本名称
  exit 1
fi

if [ ! -f "./scripts/$1.ts" ]; then
  echo [ERROR] 指定脚本不存在
  exit 1
fi

pnpm ts-node scripts/$1.ts
