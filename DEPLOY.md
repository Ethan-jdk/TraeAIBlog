# GitHub Pages 部署指南

## 准备工作

### 1. 创建 GitHub 仓库

1. 在 GitHub 上创建一个新仓库，命名为 `blog`（或其他名称）
2. 将本地代码推送到 GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/blog.git
git push -u origin main
```

### 2. 安装依赖

```bash
npm install
```

## 部署步骤

### 方法一：使用 gh-pages 自动部署（推荐）

1. **配置 vite.config.js**

   确保 `base` 配置正确：
   - 如果仓库名是 `blog`，则 `base: '/blog/'`
   - 如果使用自定义域名，则 `base: '/'`

2. **运行部署命令**

```bash
npm run deploy
```

这会自动构建项目并部署到 GitHub Pages。

### 方法二：手动部署

1. **构建项目**

```bash
npm run build
```

2. **部署到 GitHub Pages**

将 `dist` 文件夹的内容推送到 `gh-pages` 分支：

```bash
# 安装 gh-pages（如果还没安装）
npm install -g gh-pages

# 部署
gh-pages -d dist
```

### 方法三：使用 GitHub Actions 自动部署

1. 在仓库中创建 `.github/workflows/deploy.yml` 文件：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

2. 推送代码到 main 分支，GitHub Actions 会自动部署

## 配置 GitHub Pages

1. 进入仓库的 **Settings** > **Pages**
2. 在 **Source** 部分选择 **Deploy from a branch**
3. 选择 **gh-pages** 分支和 **/(root)** 文件夹
4. 点击 **Save**

## 访问网站

部署完成后，你的网站将可以通过以下地址访问：

- `https://你的用户名.github.io/blog/`

如果使用自定义域名，在 `public` 文件夹中添加 `CNAME` 文件，内容为你的域名。

## 注意事项

1. **路由问题**：本项目已配置好 SPA 路由处理，支持页面刷新
2. **资源路径**：确保 `vite.config.js` 中的 `base` 配置正确
3. **404 页面**：已添加 `404.html` 处理前端路由

## 常见问题

### 页面刷新 404

确保 `404.html` 文件在 `public` 文件夹中，并且已正确配置。

### 资源加载失败

检查 `vite.config.js` 中的 `base` 路径是否与仓库名一致。

### 部署后样式丢失

确保构建成功，并且所有资源都在 `dist` 文件夹中。
