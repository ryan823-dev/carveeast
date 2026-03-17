# 🚀 立即部署到 Vercel

## 步骤（5 分钟完成）

### 1️⃣ 访问 Vercel 导入页面
👉 **[https://vercel.com/new](https://vercel.com/new)**

### 2️⃣ 导入 GitHub 仓库
- 点击 **"Import Git Repository"**
- 找到并选择：**`ryan823-dev/carveeast`**
- 点击 **"Import"**

### 3️⃣ 配置项目（保持默认即可）
- **Framework Preset**: Next.js（自动检测）
- **Build Command**: `prisma generate && next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 4️⃣ 添加环境变量
点击 **"Environment Variables"** 添加：
```
DATABASE_URL = file:./dev.db
```

### 5️⃣ 点击部署
- 点击 **"Deploy"** 按钮
- 等待 2-3 分钟构建完成
- ✅ 部署成功！

---

## 🎉 完成后的链接

部署成功后你会获得：
- **公开访问链接**: `https://carveeast-xxx.vercel.app`
- **管理后台**: `https://carveeast-xxx.vercel.app/artist-dashboard`

可以直接分享给艺术家和合作伙伴查看！

---

## 🔑 演示账号

### 艺术家账号（江豪旭）
- **邮箱**: jiang@godseal.com
- **密码**: 任意密码
- **后台**: `/artist-dashboard`

### 收藏家账号
- **邮箱**: collector@example.com  
- **密码**: 任意密码

---

## 💡 提示

- ✅ 部署后所有功能都可用（除了本地数据库）
- ⚠️ 生产环境建议使用 PostgreSQL（Vercel 提供免费额度）
- 🎨 艺术家可以立即登录后台编辑资料和上传作品
- 📱 网站完全响应式，支持手机和平板

---

## 需要绑定域名？

部署完成后在 Vercel 项目设置中：
1. 点击 **"Domains"**
2. 输入你的域名
3. 按提示配置 DNS 即可

---

**现在就开始部署吧！** 🚀
