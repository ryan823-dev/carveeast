# Supabase Setup Guide

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up / Sign in
3. Click "New Project"
4. Enter project details:
   - Name: `carve-east`
   - Database Password: (generate strong password)
   - Region: `Southeast Asia (Singapore)` (closest to Hong Kong)
5. Wait for project to be created (~2 minutes)

## 2. Get API Keys

1. Go to Project Settings → API
2. Copy these values:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY`

## 3. Configure Environment Variables

Add to `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 4. Run Database Migrations

### Option A: Using Supabase Dashboard (SQL Editor)

1. Go to SQL Editor in Supabase Dashboard
2. Click "New Query"
3. Copy contents from `supabase/migrations/001_create_orders.sql`
4. Click "Run"

### Option B: Using Supabase CLI (Recommended for development)

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref your_project_ref

# Run migrations
supabase db push
```

## 5. Verify Setup

Check that tables are created:
- `orders`
- `order_items`
- `shipping_tracking`
- `admin_users`
- `activity_logs`

And views:
- `order_summary`
- `daily_orders`

## 6. Create First Admin User

Run in Supabase SQL Editor:

```sql
-- Create admin user (replace with your email)
INSERT INTO admin_users (email, name, role, is_active)
VALUES ('your-email@example.com', 'Admin Name', 'admin', true);
```

## 7. Test API

Start development server:
```bash
npm run dev
```

Test order creation:
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerEmail": "test@example.com",
    "customerName": "Test Customer",
    "items": [
      {
        "workId": "work-1",
        "workTitle": "Test Work",
        "workSlug": "test-work",
        "artistName": "Test Artist",
        "price": 1000
      }
    ],
    "shippingAddress": {
      "line1": "123 Test St",
      "city": "Hong Kong",
      "postalCode": "00000",
      "country": "HK"
    },
    "billingAddress": {
      "line1": "123 Test St",
      "city": "Hong Kong",
      "postalCode": "00000",
      "country": "HK"
    },
    "subtotal": 1000,
    "total": 1000
  }'
```

## 8. Row Level Security (RLS)

RLS is enabled with these rules:
- Users can only view their own orders
- Admin users can view/manage all orders
- Only admins can manage other admin users

## Troubleshooting

### Connection Issues
- Check if environment variables are set correctly
- Verify project is not paused (free tier pauses after 7 days inactivity)

### RLS Errors
- Make sure admin user exists in `admin_users` table
- Check user role is set correctly

### Migration Errors
- Run migrations in order (001, 002, etc.)
- Check for conflicting table names
