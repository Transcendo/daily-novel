#!/bin/sh
set -e

WORK_DIR="${WORK_PROJECT_NAME_DIR}"
if [ -z "${WORK_DIR}" ]; then
  WORK_DIR="${CI_PROJECT_DIR}"
fi
if [ ! -d "${WORK_DIR}" ]; then
  echo "WORK_PROJECT_NAME_DIR 无效：${WORK_DIR}" >&2
  exit 1
fi
cd "${WORK_DIR}"

echo "安装依赖"
pnpm install --frozen-lockfile

echo "执行类型检查"
pnpm typecheck
