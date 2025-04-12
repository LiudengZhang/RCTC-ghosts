# GitHub Pages 部署指南

这个指南将帮助您将剧本练习应用部署到 GitHub Pages，完全免费且易于管理。

## 步骤一：注册 GitHub 账号

如果您还没有 GitHub 账号，请前往 [GitHub](https://github.com/) 注册一个账号。

## 步骤二：创建新仓库

1. 登录您的 GitHub 账号
2. 点击右上角的 "+" 图标，然后选择 "New repository"
3. 仓库名称输入 `script-practice-app`（或者您喜欢的任何名称）
4. 保持公开（Public）
5. 不要选择任何初始化选项（不要添加README，.gitignore等）
6. 点击 "Create repository"

## 步骤三：上传文件

您有两种上传文件的方法：

### 方法 1：使用 GitHub 网页上传（简单）

1. 在新创建的仓库页面，点击 "uploading an existing file" 链接
2. 将以下文件拖放到上传区域：
   - `index.html`
   - `script-practice-app.js`
   - `sample-script.txt`
   - `README.md`
3. 在下方添加提交信息，如 "Initial commit"
4. 点击 "Commit changes"

### 方法 2：使用 Git 命令行（高级）

如果您熟悉Git，可以执行以下命令：

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/您的用户名/script-practice-app.git
git push -u origin main
```

## 步骤四：启用 GitHub Pages

1. 在仓库页面，点击 "Settings" 选项卡
2. 在左侧边栏，点击 "Pages"
3. 在 "Source" 部分，从下拉菜单中选择 "main" 分支
4. 点击 "Save"
5. 等待几分钟，GitHub 会自动部署您的网站
6. 部署完成后，您会看到一个绿色的提示框，包含您的网站URL，通常格式为：
   `https://您的用户名.github.io/script-practice-app/`

## 步骤五：分享您的应用

1. 访问您的网站链接，确认一切工作正常
2. 将链接分享给您的朋友，他们可以直接使用浏览器访问您的剧本练习应用

## 更新您的应用

如果您想要修改应用，可以：

1. 在 GitHub 网页上直接编辑文件
2. 或者，将仓库克隆到本地，修改后再推送更新

## 自定义域名（可选）

如果您拥有自己的域名，可以在 GitHub Pages 设置中配置自定义域名。 