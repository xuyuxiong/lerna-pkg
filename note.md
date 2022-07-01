## Lerna简介
原生脚手架开发痛点分析
- 痛点一 重复操作
多Package本地link
多Package依赖安装
多Package单元测试
多Package代码提交
多Package代码发布
- 痛点二 版本一致性
发布后版本一致性
发布后相互依赖版本升级
## lerna简介
Lerna是一个优化基于git + npm的多package项目的管理工具
优势：
大幅减少重复操作
提升操作的标准化
>Lerna是架构优化的产物，它揭示了一个架构真理：项目复杂度提升后，就需要对项目进行架构优化。架构优化的主要目标往往都是以效能为核心。
- 脚手架项目初始化
初始化npm项目 -> 安装lerna -> lerna init 初始化项目
- 创建package
lerna create 创建package -> lerna add安装依赖 lerna link 链接依赖
- 脚手架开发和测试
lerna exec执行shell脚本 lerna exec --scope @lin-cli/core --rm -rf node_modules/
lerna run执行npm命令
lerna clear清理依赖
lerna bootstrap重装依赖
- 脚手架发布上线
lerna version
lerna changed查看上版本以来的所有变更
lerna diff查看diff
lerna publish项目发布