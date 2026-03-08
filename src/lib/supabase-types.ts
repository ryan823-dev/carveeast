export type Database = {
  public: {
    Tables: {
      orders: {
        Row: {
          id: string;
          order_number: string;
          user_id: string | null;
          customer_email: string;
          customer_name: string;
          customer_phone: string | null;
          status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
          payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
          payment_intent_id: string | null;
          subtotal: number;
          shipping_cost: number;
          tax_amount: number;
          total: number;
          currency: string;
          shipping_address: Json;
          billing_address: Json;
          notes: string | null;
          created_at: string;
          updated_at: string;
          paid_at: string | null;
          shipped_at: string | null;
          delivered_at: string | null;
        };
        Insert: {
          id?: string;
          order_number: string;
          user_id?: string | null;
          customer_email: string;
          customer_name: string;
          customer_phone?: string | null;
          status?: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded';
          payment_intent_id?: string | null;
          subtotal: number;
          shipping_cost?: number;
          tax_amount?: number;
          total: number;
          currency?: string;
          shipping_address: Json;
          billing_address: Json;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
          paid_at?: string | null;
          shipped_at?: string | null;
          delivered_at?: string | null;
        };
        Update: {
          id?: string;
          order_number?: string;
          user_id?: string | null;
          customer_email?: string;
          customer_name?: string;
          customer_phone?: string | null;
          status?: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded';
          payment_intent_id?: string | null;
          subtotal?: number;
          shipping_cost?: number;
          tax_amount?: number;
          total?: number;
          currency?: string;
          shipping_address?: Json;
          billing_address?: Json;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
          paid_at?: string | null;
          shipped_at?: string | null;
          delivered_at?: string | null;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          work_id: string;
          work_title: string;
          work_slug: string;
          artist_name: string;
          price: number;
          currency: string;
          quantity: number;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          work_id: string;
          work_title: string;
          work_slug: string;
          artist_name: string;
          price: number;
          currency?: string;
          quantity?: number;
          image_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          work_id?: string;
          work_title?: string;
          work_slug?: string;
          artist_name?: string;
          price?: number;
          currency?: string;
          quantity?: number;
          image_url?: string | null;
          created_at?: string;
        };
      };
      shipping_tracking: {
        Row: {
          id: string;
          order_id: string;
          carrier: string;
          tracking_number: string;
          tracking_url: string | null;
          status: 'pre_transit' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'exception';
          shipped_at: string;
          estimated_delivery: string | null;
          delivered_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          carrier: string;
          tracking_number: string;
          tracking_url?: string | null;
          status?: 'pre_transit' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'exception';
          shipped_at: string;
          estimated_delivery?: string | null;
          delivered_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          carrier?: string;
          tracking_number?: string;
          tracking_url?: string | null;
          status?: 'pre_transit' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'exception';
          shipped_at?: string;
          estimated_delivery?: string | null;
          delivered_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      admin_users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: 'admin' | 'editor' | 'support';
          is_active: boolean;
          last_login_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          role?: 'admin' | 'editor' | 'support';
          is_active?: boolean;
          last_login_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          role?: 'admin' | 'editor' | 'support';
          is_active?: boolean;
          last_login_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      activity_logs: {
        Row: {
          id: string;
          user_id: string | null;
          admin_id: string | null;
          action: string;
          entity_type: string;
          entity_id: string;
          details: Json | null;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          admin_id?: string | null;
          action: string;
          entity_type: string;
          entity_id: string;
          details?: Json | null;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          admin_id?: string | null;
          action?: string;
          entity_type?: string;
          entity_id?: string;
          details?: Json | null;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      order_summary: {
        Row: {
          status: string;
          count: number;
          total_revenue: number;
        };
      };
      daily_orders: {
        Row: {
          date: string;
          order_count: number;
          revenue: number;
        };
      };
    };
    Functions: {
      generate_order_number: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
  };
};

type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];
