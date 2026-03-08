// User Management System for CarveEast
// Manages users, admin users, and user activity

import { supabaseClient, supabaseServer } from './supabase';

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  role: 'user' | 'admin' | 'editor';
  isActive: boolean;
  emailVerified: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserActivity {
  id: string;
  userId: string;
  userEmail: string;
  action: string;
  entityType: string;
  entityId: string;
  details?: Record<string, any>;
  ipAddress?: string;
  createdAt: string;
}

// List all users
export async function listUsers(options: {
  role?: string;
  isActive?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
} = {}): Promise<{ users: User[]; total: number }> {
  try {
    let query = supabaseClient
      .from('users')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (options.role) {
      query = query.eq('role', options.role);
    }

    if (options.isActive !== undefined) {
      query = query.eq('is_active', options.isActive);
    }

    if (options.search) {
      query = query.or(`email.ilike.%${options.search}%,name.ilike.%${options.search}%`);
    }

    const { data, error, count } = await query
      .range(options.offset || 0, (options.offset || 0) + (options.limit || 20) - 1);

    if (error) throw error;

    return {
      users: (data || []).map((u: any) => ({
        id: u.id,
        email: u.email,
        name: u.name,
        avatar: u.avatar,
        role: u.role,
        isActive: u.is_active,
        emailVerified: u.email_verified,
        lastLoginAt: u.last_login_at,
        createdAt: u.created_at,
        updatedAt: u.updated_at,
      })),
      total: count || 0,
    };
  } catch (error) {
    console.error('Error listing users:', error);
    return { users: [], total: 0 };
  }
}

// Get user by ID
export async function getUserById(id: string): Promise<User | null> {
  try {
    const { data, error } = await supabaseClient
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return {
      id: data.id,
      email: data.email,
      name: data.name,
      avatar: data.avatar,
      role: data.role,
      isActive: data.is_active,
      emailVerified: data.email_verified,
      lastLoginAt: data.last_login_at,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

// Update user
export async function updateUser(
  id: string,
  updates: Partial<User>
): Promise<User | null> {
  try {
    const { data, error } = await supabaseServer
      .from('users')
      .update({
        name: updates.name,
        avatar: updates.avatar,
        role: updates.role,
        is_active: updates.isActive,
        email_verified: updates.emailVerified,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      email: data.email,
      name: data.name,
      avatar: data.avatar,
      role: data.role,
      isActive: data.is_active,
      emailVerified: data.email_verified,
      lastLoginAt: data.last_login_at,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
}

// Delete user
export async function deleteUser(id: string): Promise<boolean> {
  try {
    const { error } = await supabaseServer.from('users').delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    return false;
  }
}

// List admin users
export async function listAdminUsers(): Promise<User[]> {
  try {
    const { data, error } = await supabaseClient
      .from('users')
      .select('*')
      .in('role', ['admin', 'editor'])
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map((u: any) => ({
      id: u.id,
      email: u.email,
      name: u.name,
      avatar: u.avatar,
      role: u.role,
      isActive: u.is_active,
      emailVerified: u.email_verified,
      lastLoginAt: u.last_login_at,
      createdAt: u.created_at,
      updatedAt: u.updated_at,
    }));
  } catch (error) {
    console.error('Error listing admin users:', error);
    return [];
  }
}

// Create admin user
export async function createAdminUser(
  email: string,
  name: string,
  role: 'admin' | 'editor' = 'editor'
): Promise<User | null> {
  try {
    // First create auth user
    const { data: authData, error: authError } = await supabaseServer.auth.admin.createUser({
      email,
      email_confirm: true,
    });

    if (authError) throw authError;

    // Then create user record
    const { data, error } = await supabaseServer
      .from('users')
      .insert({
        id: authData.user.id,
        email,
        name,
        role,
        is_active: true,
        email_verified: true,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      email: data.email,
      name: data.name,
      avatar: data.avatar,
      role: data.role,
      isActive: data.is_active,
      emailVerified: data.email_verified,
      lastLoginAt: data.last_login_at,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  } catch (error) {
    console.error('Error creating admin user:', error);
    return null;
  }
}

// Get user activity
export async function getUserActivity(
  userId?: string,
  limit: number = 50
): Promise<UserActivity[]> {
  try {
    let query = supabaseClient
      .from('activity_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;

    if (error) throw error;

    return (data || []).map((a: any) => ({
      id: a.id,
      userId: a.user_id,
      userEmail: a.user_email,
      action: a.action,
      entityType: a.entity_type,
      entityId: a.entity_id,
      details: a.details,
      ipAddress: a.ip_address,
      createdAt: a.created_at,
    }));
  } catch (error) {
    console.error('Error getting user activity:', error);
    return [];
  }
}

// Log activity
export async function logActivity(
  activity: Omit<UserActivity, 'id' | 'createdAt'>
): Promise<void> {
  try {
    await supabaseServer.from('activity_logs').insert({
      user_id: activity.userId,
      user_email: activity.userEmail,
      action: activity.action,
      entity_type: activity.entityType,
      entity_id: activity.entityId,
      details: activity.details,
      ip_address: activity.ipAddress,
    });
  } catch (error) {
    console.error('Error logging activity:', error);
  }
}

// Get user statistics
export async function getUserStats(): Promise<{
  totalUsers: number;
  activeUsers: number;
  adminUsers: number;
  newUsersThisMonth: number;
}> {
  try {
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    const [{ count: totalUsers }, { count: activeUsers }, { count: adminUsers },
           { count: newUsersThisMonth }] = await Promise.all([
      supabaseClient.from('users').select('*', { count: 'exact', head: true }),
      supabaseClient.from('users').select('*', { count: 'exact', head: true }).eq('is_active', true),
      supabaseClient.from('users').select('*', { count: 'exact', head: true }).in('role', ['admin', 'editor']),
      supabaseClient.from('users').select('*', { count: 'exact', head: true }).gte('created_at', monthAgo.toISOString()),
    ]);

    return {
      totalUsers: totalUsers || 0,
      activeUsers: activeUsers || 0,
      adminUsers: adminUsers || 0,
      newUsersThisMonth: newUsersThisMonth || 0,
    };
  } catch (error) {
    console.error('Error getting user stats:', error);
    return {
      totalUsers: 0,
      activeUsers: 0,
      adminUsers: 0,
      newUsersThisMonth: 0,
    };
  }
}
