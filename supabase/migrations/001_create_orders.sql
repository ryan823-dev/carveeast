-- Create page_views table for analytics
CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  ip TEXT,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for page_views
CREATE INDEX idx_page_views_path ON page_views(path);
CREATE INDEX idx_page_views_created_at ON page_views(created_at);
CREATE INDEX idx_page_views_user_id ON page_views(user_id);

-- Enable RLS for page_views
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for page_views
CREATE POLICY "Admin users can view page_views"
  ON page_views FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = true
  ));

CREATE POLICY "Anyone can insert page_views"
  ON page_views FOR INSERT
  WITH CHECK (true);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_intent_id TEXT,
  subtotal DECIMAL(12, 2) NOT NULL,
  shipping_cost DECIMAL(12, 2) DEFAULT 0,
  tax_amount DECIMAL(12, 2) DEFAULT 0,
  total DECIMAL(12, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  shipping_address JSONB NOT NULL,
  billing_address JSONB NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  paid_at TIMESTAMP WITH TIME ZONE,
  shipped_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  work_id TEXT NOT NULL,
  work_title TEXT NOT NULL,
  work_slug TEXT NOT NULL,
  artist_name TEXT NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  quantity INTEGER DEFAULT 1,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create shipping_tracking table
CREATE TABLE IF NOT EXISTS shipping_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  carrier TEXT NOT NULL,
  tracking_number TEXT NOT NULL,
  tracking_url TEXT,
  status TEXT DEFAULT 'pre_transit' CHECK (status IN ('pre_transit', 'in_transit', 'out_for_delivery', 'delivered', 'exception')),
  shipped_at TIMESTAMP WITH TIME ZONE NOT NULL,
  estimated_delivery TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor', 'support')),
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create activity_logs table
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  admin_id UUID REFERENCES admin_users(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  details JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_shipping_tracking_order_id ON shipping_tracking(order_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at);
CREATE INDEX idx_activity_logs_entity ON activity_logs(entity_type, entity_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shipping_tracking_updated_at
  BEFORE UPDATE ON shipping_tracking
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create order_summary view
CREATE OR REPLACE VIEW order_summary AS
SELECT
  status,
  COUNT(*) as count,
  COALESCE(SUM(total), 0) as total_revenue
FROM orders
GROUP BY status;

-- Create daily_orders view
CREATE OR REPLACE VIEW daily_orders AS
SELECT
  DATE(created_at) as date,
  COUNT(*) as order_count,
  COALESCE(SUM(total), 0) as revenue
FROM orders
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipping_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for orders
CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admin users can view all orders"
  ON orders FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = true
  ));

CREATE POLICY "Admin users can insert orders"
  ON orders FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = true
  ));

CREATE POLICY "Admin users can update orders"
  ON orders FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = true
  ));

-- Create RLS policies for order_items
CREATE POLICY "Users can view their own order items"
  ON order_items FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM orders WHERE id = order_items.order_id AND user_id = auth.uid()
  ));

CREATE POLICY "Admin users can view all order items"
  ON order_items FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = true
  ));

CREATE POLICY "Admin users can insert order items"
  ON order_items FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = true
  ));

-- Create RLS policies for admin_users
CREATE POLICY "Admin users can view admin_users"
  ON admin_users FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM admin_users au WHERE au.id = auth.uid() AND au.is_active = true
  ));

CREATE POLICY "Only admins can manage admin_users"
  ON admin_users FOR ALL
  USING (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid() AND role = 'admin' AND is_active = true
  ));

-- Create RLS policies for activity_logs
CREATE POLICY "Admin users can view activity_logs"
  ON activity_logs FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = true
  ));

CREATE POLICY "Admin users can insert activity_logs"
  ON activity_logs FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = true
  ));
