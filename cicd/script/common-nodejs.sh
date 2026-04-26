#!/bin/sh
set -e

if [ -z "${NPM_REGISTRY_URL}" ]; then
  NPM_REGISTRY_URL="https://repo.huaweicloud.com/repository/npm/"
fi
if [ -z "${PNPM_STORE_PATH}" ]; then
  PNPM_STORE_PATH=".pnpm-store"
fi
if [ -z "${PNPM_VERSION}" ]; then
  PNPM_VERSION="10.30.2"
fi

if ! command -v git >/dev/null 2>&1; then
  echo "安装 git"
  if command -v apk >/dev/null 2>&1; then
    sed -i 's#https\?://dl-cdn.alpinelinux.org/alpine#https://mirrors.tuna.tsinghua.edu.cn/alpine#g' /etc/apk/repositories || true
    apk add --no-cache git
  elif command -v apt-get >/dev/null 2>&1; then
    apt-get update
    apt-get install -y --no-install-recommends git
    rm -rf /var/lib/apt/lists/*
  else
    echo "未找到可用的包管理器，无法安装 git" >&2
    exit 1
  fi
fi

echo "准备 pnpm"
npm config set registry "${NPM_REGISTRY_URL}"
corepack enable
corepack prepare "pnpm@${PNPM_VERSION}" --activate
pnpm config set registry "${NPM_REGISTRY_URL}"
pnpm config set store-dir "${PNPM_STORE_PATH}"

if [ -n "${NEXT_TELEMETRY_DISABLED}" ]; then
  export NEXT_TELEMETRY_DISABLED
fi
