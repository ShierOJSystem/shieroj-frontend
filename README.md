# shieroj-frontend

## 项目安装和部署
### 1、安装项目依赖
```bash
npm install
# 
yarn 
```
本项目使用到的依赖/插件（不需执行）
```bash
# 组件库
yarn add --dev @arco-design/web-vue 
# Axios 工具
yarn add axios
# MarkDown 编辑器依赖
yarn add @bytemd/vue-next
# 为了使用多语言 locals目录在 bytemd 下
yarn add bytemd  
yarn add @bytemd/plugin-math @bytemd/plugin-highlight @bytemd/plugin-gfm 
yarn add highlight.js # 代码高亮

# 代码编辑器
yarn add monaco-editor
# 将webpack和文本编辑器整合在一起，便于打包和安装
yarn add monaco-editor-webpack-plugin 
```

### 获取后端代码接口
```
openapi --input http://localhost:8104/api//v2/api-docs --output ./backapi --client axios
```

### 2、项目构建
```bash
yarn build
```

### 3、生产环境运行
```
yarn serve
```

### 修复文件
```
yarn lint
```