import { Metadata } from 'next';
import Link from 'next/link';
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admin Dashboard | CarveEast',
  description: 'CarveEast admin dashboard for managing orders, content, and analytics.',
};

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/admin/works', label: 'Works', icon: Package },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Admin Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-[#E5E4E2] z-50">
        <div className="p-6 border-b border-[#E5E4E2]">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-2xl font-serif font-medium text-[#1A1A1A]">
              CE
            </span>
            <span className="text-sm text-[#7A7A78]">Admin</span>
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-[#4A4A48] hover:bg-[#F5F4F2] hover:text-[#1A1A1A] rounded-lg transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#E5E4E2]">
          <button className="flex items-center gap-3 px-4 py-3 text-[#7A7A78] hover:text-[#B83A2F] w-full transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-[#E5E4E2] px-8 py-4 z-40">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-medium text-[#1A1A1A]">
              Admin Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#7A7A78]">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
