# 个人博客

一个基于 React + Vite + Supabase 的现代化个人博客网站。

## 功能特性

- 🏠 **首页** - 展示最新博客文章和分类
- 📝 **文章详情页** - 查看完整的博客文章内容
- 📂 **分类页面** - 按分类浏览文章
- ℹ️ **关于页面** - 个人介绍

## 技术栈

- **前端框架**: React 18
- **构建工具**: Vite
- **路由**: React Router v6
- **后端服务**: Supabase
- **部署**: Netlify

## 项目结构

```
├── src/
│   ├── components/      # 组件
│   │   ├── Layout.jsx   # 布局组件
│   │   └── Layout.css
│   ├── pages/          # 页面
│   │   ├── Home.jsx     # 首页
│   │   ├── PostDetail.jsx  # 文章详情页
│   │   ├── Category.jsx    # 分类页
│   │   └── About.jsx       # 关于页
│   ├── lib/            # 工具库
│   │   └── supabase.js  # Supabase客户端配置
│   ├── App.jsx         # 主应用组件
│   ├── main.jsx        # 入口文件
│   └── index.css       # 全局样式
├── index.html
├── package.json
└── vite.config.js
```

## 安装和运行

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 文件为 `.env`，并填入你的 Supabase 配置：

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 查看网站。

### 4. 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

## 数据库表结构

项目使用以下 Supabase 数据表：

1. **类别** (Category) - 存储博客分类
   - `id` - 主键
   - `名字` / `name` - 分类名称
   - `created_at` - 创建时间

2. **职位** (Position) - 存储博客文章
   - `id` - 主键
   - `标题` / `title` / `名字` / `name` - 文章标题
   - `内容` / `content` / `描述` / `description` - 文章内容
   - `类别_id` / `category_id` - 关联的分类ID
   - `created_at` - 创建时间

3. **post_categories** - 文章和分类的关联表（可选）
   - `职位_id` / `post_id` - 文章ID
   - `类别_id` / `category_id` - 分类ID

## 部署到 Netlify

### 方法一：通过 Netlify Dashboard

1. 登录 [Netlify](https://www.netlify.com/)
2. 点击 "Add new site" -> "Import an existing project"
3. 连接你的 Git 仓库（GitHub/GitLab/Bitbucket）
4. 配置构建设置：
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. 添加环境变量：
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. 点击 "Deploy site"

### 方法二：通过 Netlify CLI

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录
netlify login

# 初始化项目
netlify init

# 部署
netlify deploy --prod
```

## 注意事项

- 确保 Supabase 数据表的列名与代码中的字段名匹配
- 如果表名或字段名不同，需要修改 `src/pages/` 目录下相应文件中的查询语句
- 在生产环境部署前，确保设置了正确的环境变量

## 许可证

MIT

