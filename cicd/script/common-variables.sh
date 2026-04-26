#!/bin/sh
set -e

BRANCH_NAME="${CI_COMMIT_BRANCH}"
if [ -z "${BRANCH_NAME}" ]; then
  BRANCH_NAME="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || true)"
fi

case "${BRANCH_NAME}" in
  main|*-main) PROFILE="pro" ;;
  test|*-test) PROFILE="test" ;;
  *)
    echo "未知的分支：${BRANCH_NAME}，无法确定部署环境" >&2
    exit 1
    ;;
esac
export PROFILE

LOWER_DOCKER_IMAGE_NAME="$(printf '%s' "${DOCKER_IMAGE_NAME}" | tr '[:upper:]' '[:lower:]')"
export LOWER_DOCKER_IMAGE_NAME

if [ -z "${CONTAINER_PORT}" ]; then
  CONTAINER_PORT="${APPLICATION_PORT}"
fi
export CONTAINER_PORT

case "${PROFILE}" in
  pro) NACOS_ADDR="${NACOS_PRO_ADDR}" ;;
  test) NACOS_ADDR="${NACOS_TEST_ADDR}" ;;
esac
export NACOS_ADDR

if [ -z "${NACOS_ENABLED}" ]; then
  NACOS_ENABLED="true"
fi
export NACOS_ENABLED

export NACOS_DATA_ID
export NACOS_GROUP
export NACOS_NAMESPACE
export NACOS_USERNAME
export NACOS_PASSWORD

if [ "${NACOS_ENABLED}" = "true" ] && { [ -z "${NACOS_ADDR}" ] || [ -z "${NACOS_DATA_ID}" ]; }; then
  echo "NACOS_ENABLED=true 时必须提供 NACOS_ADDR 与 NACOS_DATA_ID" >&2
  exit 1
fi

echo "========== 构建环境信息 =========="
echo "PROFILE: ${PROFILE}"
echo "CI_PROJECT_NAME: ${CI_PROJECT_NAME:-content-show}"
echo "WORK_PROJECT_NAME_DIR: ${WORK_PROJECT_NAME_DIR}"
echo "DOCKER_IMAGE_NAME: ${DOCKER_IMAGE_NAME}"
echo "LOWER_DOCKER_IMAGE_NAME: ${LOWER_DOCKER_IMAGE_NAME}"
echo "DOCKER_IMAGE_VERSION: ${DOCKER_IMAGE_VERSION}"
echo "CONTAINER_PORT: ${CONTAINER_PORT}"
echo "NACOS_ENABLED: ${NACOS_ENABLED}"
echo "NEXT_PUBLIC_SITE_URL: ${NEXT_PUBLIC_SITE_URL:-<empty>}"
echo "=================================="
