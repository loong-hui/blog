# Express Blog Backend

博客后端 API 服务，使用 Express + MongoDB 构建。

## 技术栈

- Express
- Mongoose
- JWT
- Morgan

## 开发

```bash
pnpm install
pnpm start
```

## API 端点

### 用户
- POST /api/users/register - 注册
- POST /api/users/login - 登录

### 文章
- GET /api/articles - 获取文章列表
- POST /api/articles - 创建文章
- PUT /api/articles/:id - 更新文章
- DELETE /api/articles/:id - 删除文章

### 评论
- GET /api/comments - 获取评论
- POST /api/comments - 添加评论

### 标签
- GET /api/tags - 获取标签
