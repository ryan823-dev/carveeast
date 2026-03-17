# 🎯 手动部署到 Vercel - 超详细步骤

## 方式一：通过 Vercel 网站部署（最简单，5 分钟搞定）

### 第 1 步：访问 Vercel
打开浏览器，访问：**[https://vercel.com](https://vercel.com)**

### 第 2 步：登录/注册
- 点击 "Sign Up" 或 "Login"
- 推荐使用 **GitHub 账号** 登录（最方便）
- 也可以用邮箱注册

### 第 3 步：导入项目
1. 登录后点击 **"Add New Project"**
2. 选择 **"Import Git Repository"**
3. 找到并选择 **`ryan823-dev/carveeast`** 仓库
4. 点击 **"Import"**

### 第 4 步：配置项目（保持默认即可）
在配置页面：

**Framework Preset**: 
- 选择 **Next.js**（应该会自动检测）

**Build Command**: 
```
prisma generate && next build
```

**Output Directory**: 
- 保持默认 `.next`

**Install Command**: 
- 保持默认 `npm install`

### 第 5 步：添加环境变量
1. 点击 **"Environment Variables"** 展开
2. 点击 **"Add New"**
3. 添加以下变量：

```
Key: DATABASE_URL
Value: file:./dev.db
```

4. 点击 **"Save"**

### 第 6 步：开始部署
1. 点击 **"Deploy"** 按钮
2. 等待 2-5 分钟（可以看到构建日志）
3. 看到 ✅ 图标表示部署成功！

### 第 7 步：获取访问链接
部署成功后，你会看到：
- **Production URL**: `https://carveeast-xxx.vercel.app`
- 点击链接即可访问你的网站！

---

## 方式二：使用 Vercel CLI 部署

### 前提条件
- 已安装 Node.js 和 npm
- 已安装 Vercel CLI（运行 `npm install -g vercel`）

### 部署步骤

```bash
# 1. 进入项目目录
cd d:\qoder\carveeast

# 2. 登录 Vercel
vercel login

# 3. 首次部署（会提示创建项目）
vercel

# 4. 部署到生产环境
vercel --prod
```

---

## 🎉 部署完成后

### 你可以：

1. **分享链接给艺术家**
   - 主站点：`https://carveeast-xxx.vercel.app`
   - 艺术家后台：`https://carveeast-xxx.vercel.app/artist-dashboard`

2. **测试艺术家功能**
   - 访问登录页面
   - 使用演示账号登录：
     - 邮箱：`jiang@godseal.com`
     - 密码：任意密码
   - 访问艺术家后台上传作品

3. **绑定自定义域名**（可选）
   - 在 Vercel 项目页面点击 "Domains"
   - 输入你的域名
   - 按提示配置 DNS

---

## ⚠️ 重要提示

### 数据库说明
- 当前配置使用 SQLite（`DATABASE_URL = file:./dev.db`）
- Vercel 部署后，SQLite 文件不会持久化
- **建议升级到 PostgreSQL**：
  1. 访问 [https://vercel.com/docs/storage/vercel-postgres](https://vercel.com/docs/storage/vercel-postgres)
  2. 在 Vercel 项目中创建 Postgres 数据库
  3. 复制 CONNECTION_URL
  4. 更新环境变量 `DATABASE_URL`

### 环境变量（生产环境）
部署到 Vercel 后，在项目设置中添加：
```
DATABASE_URL=postgresql://...（Vercel Postgres 连接字符串）
```

---

## 🆘 遇到问题？

### 构建失败
检查构建日志，常见原因：
- Node.js 版本不兼容（确保使用 Node 18+）
- 依赖安装失败（运行 `npm install` 测试）
- Prisma 生成错误（运行 `npx prisma generate` 测试）

### 部署后页面空白
- 查看 Vercel 函数日志
- 检查环境变量是否正确配置
- 确认 Build Command 正确

### 数据库错误
- SQLite 在 Vercel 上是临时的
- 建议使用 Vercel Postgres（免费额度够用）

---

## 📞 需要帮助？

- Vercel 文档：[https://vercel.com/docs](https://vercel.com/docs)
- Vercel 社区：[https://github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

---

**现在就开始部署吧！整个过程只需 5 分钟！** 🚀
