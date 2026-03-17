# 🌐 域名配置指南

## 已添加的域名

**域名：** `carveeast.uniscore.top`

**状态：** ✅ 已添加到 Vercel 项目

---

## ⚙️ DNS 配置步骤

### 方式一：添加 A 记录（推荐）

在您的 DNS 提供商处添加以下记录：

**记录类型：** `A`  
**主机记录：** `carveeast`  
**记录值：** `76.76.21.21`  
**TTL：** 自动（或 3600）

### 方式二：修改 Nameservers

将域名的 Nameservers 修改为：
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

---

## 📋 操作步骤

### 1. 登录域名管理后台

访问您的域名注册商或 DNS 服务商（如阿里云、腾讯云、Cloudflare 等）

### 2. 添加 DNS 记录

**如果使用 A 记录：**
- 进入 DNS 设置页面
- 添加新记录
- 类型选择：`A`
- 主机记录填写：`carveeast`
- 记录值填写：`76.76.21.21`
- 保存设置

### 3. 等待 DNS 生效

- DNS 传播通常需要 5-30 分钟
- 最长可能需要 24-48 小时
- Vercel 会发送邮件通知配置状态

### 4. 验证配置

访问：[https://carveeast.uniscore.top](https://carveeast.uniscore.top)

---

## ✅ 配置完成后的访问地址

**主域名：** [https://carveeast.uniscore.top](https://carveeast.uniscore.top)

**备用域名（Vercel）：** [https://carveeast.vercel.app](https://carveeast.vercel.app)

---

## 🔍 常见问题

### Q: 域名配置后无法访问？
A: DNS 传播需要时间，请等待 5-30 分钟后重试

### Q: 如何检查 DNS 是否生效？
A: 使用命令 `ping carveeast.uniscore.top`，如果解析到 `76.76.21.21` 说明已生效

### Q: SSL 证书会自动配置吗？
A: 是的，Vercel 会自动为您的域名配置 SSL 证书，配置完成后自动启用 HTTPS

---

## 📞 需要帮助？

Vercel 域名文档：[https://vercel.com/docs/custom-domains](https://vercel.com/docs/custom-domains)
