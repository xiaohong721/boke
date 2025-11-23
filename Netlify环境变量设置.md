# Netlify 环境变量设置指南

## 问题：页面显示空白

如果网站显示空白页面，通常是因为 **Netlify 中没有设置环境变量**。

## 快速设置步骤

### 1. 登录 Netlify

访问 [https://app.netlify.com](https://app.netlify.com) 并登录

### 2. 进入你的网站项目

在 Dashboard 中找到你的网站，点击进入

### 3. 打开环境变量设置

1. 点击顶部菜单的 **"Site settings"**（网站设置）
2. 在左侧菜单中找到 **"Environment variables"**（环境变量）
3. 点击进入

### 4. 添加环境变量

点击 **"Add a variable"**（添加变量）按钮，添加以下两个变量：

#### 变量 1：
- **Key（键）**: `VITE_SUPABASE_URL`
- **Value（值）**: `https://gobttcgepiyckujzdakp.supabase.co`

#### 变量 2：
- **Key（键）**: `VITE_SUPABASE_ANON_KEY`
- **Value（值）**: `sb_publishable_xCnL6wI0soK72MOJfdRALw_j1SRzWDx`

### 5. 保存并重新部署

1. 点击 **"Save"**（保存）
2. 返回网站 Dashboard
3. 点击 **"Deploys"**（部署）标签
4. 点击 **"Trigger deploy"** → **"Clear cache and deploy site"**（清除缓存并部署网站）
5. 等待部署完成（1-3分钟）

## 验证设置

部署完成后，刷新你的网站，应该能看到：
- 网站正常显示
- 能看到博客文章和分类
- 不再显示空白页面

## 注意事项

- 环境变量区分大小写，请确保完全一致
- 修改环境变量后，**必须重新部署**才能生效
- 不要在环境变量的值前后添加引号或空格

## 如果还是空白

1. **检查浏览器控制台**（按 F12）：
   - 查看 Console 标签是否有错误信息
   - 查看 Network 标签，检查 Supabase 请求是否成功

2. **检查 Netlify 构建日志**：
   - 在 Netlify Dashboard → Deploys
   - 点击最新的部署
   - 查看构建日志是否有错误

3. **确认 Supabase 项目状态**：
   - 登录 Supabase Dashboard
   - 确认项目正常运行
   - 检查数据表是否存在数据

## 需要帮助？

如果按照以上步骤操作后仍有问题，请提供：
- 浏览器控制台的错误信息
- Netlify 构建日志
- 具体的错误描述

