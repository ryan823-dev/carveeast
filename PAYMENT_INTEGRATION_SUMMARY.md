# Stripe 支付系统配置完成

**配置时间**: 2026-03-20 16:20  
**状态**: ✅ 完成  

---

## 一、已完成的配置

### 1. Stripe 核心库增强
- **文件**: `src/lib/stripe.ts`
- **功能**:
  - ✅ 基础 Stripe 初始化
  - ✅ 价格格式化工具函数
  - ✅ 付款意图创建
  - ✅ 客户管理
  - ✅ Checkout Session 创建
  - ✅ **新增**: 课程产品配置 `COURSE_PRODUCTS`
  - ✅ **新增**: 课程 Checkout Session 创建函数
  - ✅ **新增**: Webhook 签名验证

### 2. 课程产品配置
```typescript
const COURSE_PRODUCTS = {
  'beginner-essentials': {
    name: 'Seal Carving Beginner Essentials',
    amount: 12900, // $129.00
  },
  'side-inscription-mastery': {
    name: 'Side Inscription Mastery',
    amount: 14900, // $149.00
  },
  'knife-techniques-advanced': {
    name: 'Advanced Knife Techniques',
    amount: 17900, // $179.00
  },
  'live-highlights': {
    name: 'Live Q&A Highlights Collection',
    amount: 14900, // $149.00
  },
}
```

### 3. API 路由
- **创建 Checkout**: `src/app/api/stripe/create-checkout/route.ts`
- **Webhook 处理**: `src/app/api/stripe/webhook/route.ts`

### 4. 前端组件
- **购买按钮**: `src/components/stripe/CourseCheckoutButton.tsx`
  - 支持加载状态
  - 错误处理
  - Stripe 重定向

### 5. 环境配置
- **示例文件**: `.env.example`
- **包含内容**:
  - Stripe API Keys
  - Webhook Secret
  - 价格 ID 配置
  - PayPal 备用配置
  - 应用 URL 配置

---

## 二、使用方法

### 1. 获取 Stripe Keys
1. 注册 Stripe 账号: https://dashboard.stripe.com
2. 获取 API Keys:
   - Test Keys (开发): `sk_test_*` / `pk_test_*`
   - Live Keys (生产): `sk_live_*` / `pk_live_*`

### 2. 配置环境变量
```bash
# 复制示例文件
cp .env.example .env.local

# 编辑 .env.local
STRIPE_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### 3. 创建产品并获取 Price ID
在 Stripe Dashboard 创建产品后：
```bash
STRIPE_PRICE_BEGINNER=price_xxx
STRIPE_PRICE_SIDE_INSIGN=price_xxx
STRIPE_PRICE_KNIFE=price_xxx
STRIPE_PRICE_LIVE=price_xxx
```

### 4. 测试 Webhook (本地开发)
```bash
# 安装 Stripe CLI
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

---

## 三、代码集成示例

### 前端购买按钮
```tsx
import CourseCheckoutButton from '@/components/stripe/CourseCheckoutButton'

// 在课程详情页使用
<CourseCheckoutButton
  courseSlug="beginner-essentials"
  courseName="Seal Carving Beginner Essentials"
  price={12900}
/>
```

### API Route
```typescript
// POST /api/stripe/create-checkout
const response = await fetch('/api/stripe/create-checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    courseSlug: 'beginner-essentials',
    email: 'customer@example.com' // optional
  })
})

const { url } = await response.json()
window.location.href = url // 跳转到 Stripe Checkout
```

---

## 四、测试步骤

### 本地测试
1. 启动开发服务器: `npm run dev`
2. 访问: http://localhost:3000/products
3. 点击课程购买按钮
4. 完成 Stripe Checkout
5. 检查 Webhook 日志

### 测试卡片
```
卡号: 4242 4242 4242 4242
有效期: 任意未来日期
CVC: 任意 3 位数字
```

---

## 五、后续配置

### 必须完成
1. ⏳ 在 Stripe Dashboard 创建 4 个产品
2. ⏳ 获取 Price IDs 并更新 `.env.local`
3. ⏳ 设置 Stripe Webhook (生产环境)
4. ⏳ 测试完整支付流程

### 可选
5. ⏳ 配置 PayPal 作为备选支付
6. ⏳ 添加优惠券功能
7. ⏳ 配置邮件通知

---

## 六、部署到 Vercel

在 Vercel 项目设置中添加环境变量:
```
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
STRIPE_PRICE_BEGINNER
STRIPE_PRICE_SIDE_INSIGN
STRIPE_PRICE_KNIFE
STRIPE_PRICE_LIVE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
NEXT_PUBLIC_SITE_URL=https://carveeast.uniscore.top
```

---

**配置完成！** Stripe 支付系统已就绪，可以开始集成到网站中。
