# Stripe 集成指南

## 1. 环境变量配置

在 `.env.local` 中添加：

```env
# Stripe Keys (从 Stripe Dashboard 获取)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## 2. 安装依赖

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

## 3. 使用方式

### 方式一：Stripe Checkout（推荐）

最简单的集成方式，Stripe 托管结账页面：

```tsx
// 在作品详情页添加购买按钮
import { useState } from 'react';

export function BuyButton({ work }: { work: Work }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleBuy = async () => {
    setIsLoading(true);

    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        workId: work.id,
        workTitle: work.title.en,
        amount: work.price?.amount,
        currency: work.price?.currency || 'usd',
      }),
    });

    const { url } = await response.json();
    window.location.href = url; // 跳转到 Stripe Checkout
  };

  return (
    <button onClick={handleBuy} disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Purchase'}
    </button>
  );
}
```

### 方式二：嵌入式支付（自定义 UI）

需要更多自定义时使用：

```tsx
import { StripePayment } from '@/components/StripePayment';

export function PaymentPage({ work }: { work: Work }) {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // 创建 PaymentIntent
    fetch('/api/payment/intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: work.price?.amount,
        currency: work.price?.currency,
        metadata: { workId: work.id },
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [work]);

  if (!clientSecret) return <div>Loading...</div>;

  return (
    <StripePayment
      clientSecret={clientSecret}
      amount={work.price?.amount || 0}
      currency={work.price?.currency || 'usd'}
      onSuccess={() => router.push('/payment/success')}
      onCancel={() => router.push('/payment/cancel')}
    />
  );
}
```

## 4. Webhook 配置

### 本地开发

```bash
# 安装 Stripe CLI
# https://stripe.com/docs/stripe-cli

# 登录
stripe login

# 转发 webhook 到本地
stripe listen --forward-to localhost:3000/api/stripe/webhook

# 复制输出的 webhook secret 到 .env.local
```

### 生产环境

1. 在 Stripe Dashboard → Developers → Webhooks 添加端点
2. URL: `https://carveeast.com/api/stripe/webhook`
3. 选择事件：
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
   - `charge.dispute.created`

## 5. 测试卡号

| 卡号 | 结果 |
|------|------|
| 4242 4242 4242 4242 | 成功 |
| 4000 0000 0000 0002 | 拒绝 |
| 4000 0025 0000 3155 | 需要 3D Secure |

## 6. 上线检查清单

- [ ] 替换 test keys 为 live keys
- [ ] 配置生产 webhook
- [ ] 测试完整支付流程
- [ ] 配置邮件通知
- [ ] 设置 Stripe Radar 规则
- [ ] 配置争议处理流程

## 7. 风控建议

### Stripe Radar 规则

1. **阻止高风险交易**：
   - 单笔 >$10,000 需要人工审核
   - 24小时内同一卡 >3 笔交易
   - IP 地址与账单国家不匹配

2. **3D Secure 触发**：
   - 所有 >$2,000 交易
   - 首次购买客户
   - 高风险国家

### 争议预防

- 清晰的产品描述
- 详细的艺术家信息
- 明确的配送时间
- 保存所有沟通记录
- 提供 authenticity certificate
