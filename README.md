# React Blog

前后端分离的博客项目，前端使用 React + Vite，后端使用 Express + MongoDB。

## 项目结构

```
├── backend/          # Express 后端服务
│   ├── src/
│   │   ├── controller/   # 控制器
│   │   ├── db/           # 数据库连接
│   │   ├── middleware/   # 中间件
│   │   ├── model/        # 数据模型
│   │   ├── routes/       # 路由
│   │   └── utils/        # 工具函数
│   ├── public/           # 静态资源
│   └── app.js            # 入口文件
├── frontend/         # React 前端应用
│   ├── src/
│   │   ├── components/   # 组件
│   │   ├── pages/        # 页面
│   │   ├── request/      # API 请求
│   │   ├── routes/       # 路由配置
│   │   └── store/        # 状态管理
│   └── public/           # 静态资源
```

## 快速开始

### 环境要求

- Node.js >= 16
- MongoDB >= 5
- pnpm (推荐) 或 npm

### 安装

```bash
# 安装后端依赖
cd backend
pnpm install

# 安装前端依赖
cd ../frontend
pnpm install
```

### 配置

在 `backend/` 目录下创建 `.env` 文件：

```env
HOST = localhost
PORT = 8000
DB_NAME = blog_demo
DB_HOST = localhost
JWT_SECRET = your_jwt_secret_here
```

### 运行

```bash
# 启动后端 (backend/)
pnpm start

# 启动前端 (frontend/)
pnpm dev
```

前端访问 http://localhost:5173，后端 API 运行在 http://localhost:8000

## 功能特性

- 用户注册/登录
- 文章发布/编辑/删除
- 文章分类（标签）
- 评论系统
- 用户关注
- 文章收藏
