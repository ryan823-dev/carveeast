# CarveEast 部署指南

## 🚀 快速部署到 Vercel

### 方式一：通过 Vercel 平台部署（推荐）

这是最简单的方式，无需配置 CLI：

1. **访问 Vercel**
   - 打开 [https://vercel.com](https://vercel.com)
   - 登录或注册账号（可使用 GitHub/GitLab/Bitbucket 账号）

2. **导入项目**
   - 点击 "Add New Project"
   - 选择 "Import Git Repository"
   - 选择你的 GitHub 仓库：`ryan823-dev/carveeast`
   
3. **配置构建设置**
   - Framework Preset: **Next.js**
   - Build Command: `prisma generate && next build`
   - Output Directory: `.next` (默认)
   - Install Command: `npm install`

4. **添加环境变量**
   在 Vercel 项目设置中添加：
   ```
   DATABASE_URL = file:./dev.db
   ```

5. **部署**
   - 点击 "Deploy"
   - 等待构建完成（约 2-3 分钟）
   - 部署成功后会获得一个 `https://carveeast-xxx.vercel.app` 域名

### 方式二：使用 Vercel CLI 部署

如果你已经安装了 Vercel CLI：

```bash
# 登录 Vercel
vercel login

# 部署到生产环境
vercel --prod
```

如果还未安装 CLI，请先访问 [https://vercel.com/login](https://vercel.com/login) 完成登录后再部署。

---

## 📦 项目特点

### 技术栈
- **Next.js 16** - React 框架
- **TypeScript** - 类型安全
- **Prisma** - 数据库 ORM
- **SQLite** - 本地开发数据库
- **Tailwind CSS** - 样式

### 核心功能
- ✅ 艺术家个人主页
- ✅ 作品展示和详情
- ✅ 艺术家后台管理系统
- ✅ 作品上传和编辑
- ✅ 用户认证系统
- ✅ 拍卖功能
- ✅ 故事/文章系统

### 数据库
项目使用 SQLite 作为本地开发数据库，数据文件位于 `prisma/dev.db`。

部署到 Vercel 后，建议使用 **PostgreSQL**（Vercel 提供免费的 Vercel Postgres）：

1. 在 Vercel 项目中创建 Postgres 数据库
2. 更新 `vercel.json` 中的 `DATABASE_URL`
3. 重新部署

---

## 🎨 艺术家后台使用

### 登录艺术家账号
- 邮箱：`jiang@godseal.com`
- 密码：任意密码（演示环境）

### 访问后台
1. 登录后访问：`/artist-dashboard`
2. 可以查看作品统计、上传新作品、管理现有作品

### 上传作品
1. 访问 `/artist-dashboard/works/new`
2. 填写作品信息：
   - 标题（中英文）
   - 类别、年份、材质
   - 尺寸、价格
   - 作品描述
   - 上传照片
3. 提交后作品会保存到数据库

---

## 🔗 分享项目

部署成功后，你可以：

1. **分享预览链接**
   - 将 Vercel 提供的 `*.vercel.app` 链接分享给他人
   - 链接示例：`https://carveeast.vercel.app`

2. **绑定自定义域名**（可选）
   - 在 Vercel 项目设置中添加域名
   - 按提示配置 DNS 记录

3. **邀请艺术家**
   - 为合作艺术家创建账号
   - 教他们访问 `/artist-dashboard` 管理作品

---

## 🛠️ 本地开发

```bash
# 安装依赖
npm install

# 生成 Prisma 客户端
npx prisma generate

# 运行数据库迁移
npx prisma migrate dev

# 启动开发服务器
npm run dev
```

访问：http://localhost:3000

---

## 📞 需要帮助？

- Vercel 文档：[https://vercel.com/docs](https://vercel.com/docs)
- Next.js 文档：[https://nextjs.org/docs](https://nextjs.org/docs)
- Prisma 文档：[https://www.prisma.io/docs](https://www.prisma.io/docs)
