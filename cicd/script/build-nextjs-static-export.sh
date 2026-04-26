#!/bin/sh
set -e

if [ -z "${DOCKERFILE_PATH}" ]; then
  echo "DOCKERFILE_PATH 未设置，无法继续构建" >&2
  exit 1
fi
if [ ! -f "${DOCKERFILE_PATH}" ]; then
  echo "Dockerfile 不存在：${DOCKERFILE_PATH}" >&2
  exit 1
fi

WORK_DIR="${WORK_PROJECT_NAME_DIR}"
if [ -z "${WORK_DIR}" ]; then
  WORK_DIR="${CI_PROJECT_DIR}"
fi
if [ ! -d "${WORK_DIR}" ]; then
  echo "WORK_PROJECT_NAME_DIR 无效：${WORK_DIR}" >&2
  exit 1
fi
cd "${WORK_DIR}"

echo "准备 Docker"
if command -v docker >/dev/null 2>&1; then
  echo "Docker CLI 已存在"
elif command -v apk >/dev/null 2>&1; then
  sed -i 's#https\?://dl-cdn.alpinelinux.org/alpine#https://mirrors.tuna.tsinghua.edu.cn/alpine#g' /etc/apk/repositories || true
  apk add --no-cache docker-cli
elif command -v apt-get >/dev/null 2>&1; then
  apt-get update
  apt-get install -y --no-install-recommends docker.io
  rm -rf /var/lib/apt/lists/*
else
  echo "未找到可用的包管理器，无法安装 Docker CLI" >&2
  exit 1
fi

echo "安装依赖"
pnpm install --frozen-lockfile

echo "登录 Docker Registry"
echo "${CI_JOB_TOKEN}" | docker login --username "${CI_REGISTRY_USER}" --password-stdin "${CI_REGISTRY}"

echo "构建静态站点"
pnpm build

if [ ! -d "out" ]; then
  echo "缺少 out 目录，请确认 next.config.js 仍然使用 output: \"export\"" >&2
  exit 1
fi

echo "准备 Docker 构建目录"
rm -rf cicd/docker/out
mkdir -p cicd/docker/out
cp -r out/. cicd/docker/out/

echo "构建 Docker 镜像"
docker build -f "${DOCKERFILE_PATH}" \
  -t "${LOWER_DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_VERSION}" \
  -t "${LOWER_DOCKER_IMAGE_NAME}:${CI_COMMIT_BRANCH}-latest" \
  "${WORK_DIR}"

echo "推送 Docker 镜像"
docker push "${LOWER_DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_VERSION}"
docker push "${LOWER_DOCKER_IMAGE_NAME}:${CI_COMMIT_BRANCH}-latest"

echo "清理本地 Docker 镜像"
docker rmi "${LOWER_DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_VERSION}" 2>/dev/null || true
docker rmi "${LOWER_DOCKER_IMAGE_NAME}:${CI_COMMIT_BRANCH}-latest" 2>/dev/null || true
docker image prune -f 2>/dev/null || true

echo "构建完成"
