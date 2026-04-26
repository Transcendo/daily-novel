# CI/CD

当前项目按静态导出站点交付：

- 构建方式：`pnpm build`，产物目录为 `out/`
- 容器方式：`Docker + Nginx`
- 生产域名：`https://ai.eggcampus.com`
- 生产目标：`ec-r-pro-project-1:8461 -> container:80`
- 测试目标：`ec-l-test-project-1:8461 -> container:80`
- 发布分支：`main` / `*-main`、`test` / `*-test`

说明：

- `.gitlab-ci.yml` 已配置为 `test -> build -> deploy`
- deploy runner tag 约定：生产 `ec-pro`，测试 `ec-test`
- `test` 阶段执行 `pnpm typecheck`
- `build` 阶段会把 `out/` 复制到 `cicd/docker/out/` 后构建镜像并推送到 GitLab Registry
- `deploy` 阶段会通过 `deployer` 用户远程登录生产机，拉取镜像并重启容器
- 当前仓库默认将 `NEXT_PUBLIC_SITE_URL` 设为 `https://ai.eggcampus.com`

上线前仍需核对两项运维事实：

1. `ec-r-gateway-1` / Caddy 是否已将 `ai.eggcampus.com` 反代到 `http://ec-r-pro-project-1:8461`
2. GitLab 项目是否已绑定可用的 `build`、`deploy` Runner，并为 `deployer` 配置好 SSH 免密
