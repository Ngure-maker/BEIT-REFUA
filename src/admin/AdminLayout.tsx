import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation, Link } from 'react-router-dom';
import { X, Menu, ChevronDown, LogOut, LayoutDashboard, Users, BookOpen, Image, BarChart3, Settings, Heart, TrendingUp, FolderOpen, Bell, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { useAuth } from '../admin/AuthContext';

interface NavItem {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: 'Content',
    items: [
      { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      { label: 'Page Editor', href: '/admin/page-editor', icon: FileText },
      { label: 'Programs', href: '/admin/programs', icon: FolderOpen },
      { label: 'Stories', href: '/admin/stories', icon: BookOpen },
      { label: 'Gallery', href: '/admin/gallery', icon: Image },
    ],
  },
  {
    label: 'Community',
    items: [
      { label: 'Prayer Requests', href: '/admin/prayer-requests', icon: Heart },
      { label: 'Volunteers', href: '/admin/volunteers', icon: Users },
      { label: 'Partnerships', href: '/admin/partnerships', icon: TrendingUp },
    ],
  },
  {
    label: 'Data',
    items: [
      { label: 'Impact Reports', href: '/admin/impact-reports', icon: BarChart3 },
      { label: 'Image Library', href: '/admin/image-library', icon: Image },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Settings', href: '/admin/settings', icon: Settings },
    ],
  },
];

// Flat list for top bar title lookup
const allNavItems = navGroups.flatMap(g => g.items);

export function AdminLayout() {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isAuthenticated) return;
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAuthenticated]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const toggleGroup = (label: string) => {
    setCollapsedGroups(prev => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  if (!isAuthenticated) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar overlay for mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-border flex flex-col',
          'transform transition-transform duration-300 ease-in-out lg:translate-x-0'
        )}
        role="navigation"
        aria-label="Admin navigation"
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-border">
          <Link to="/admin" className="flex items-center gap-3" aria-label="Admin Dashboard Home">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-deep">
              <span className="font-display text-lg font-bold text-gold">BR</span>
            </div>
            <span className="font-display text-xl font-semibold text-forest">Admin</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Close sidebar"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-4" aria-label="Main admin navigation">
          {navGroups.map((group) => {
            const isCollapsed = collapsedGroups.has(group.label);
            return (
              <div key={group.label}>
                <button
                  onClick={() => toggleGroup(group.label)}
                  className="flex items-center justify-between w-full px-3 mb-1"
                >
                  <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
                    {group.label}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-3.5 text-muted-foreground transition-transform",
                      isCollapsed && "-rotate-90"
                    )}
                  />
                </button>
                {!isCollapsed && (
                  <div className="space-y-0.5">
                    {group.items.map((item) => (
                      <NavLink
                        key={item.href}
                        to={item.href}
                        end={item.href === '/admin'}
                        className={({ isActive }) =>
                          cn(
                            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                            isActive
                              ? 'bg-forest-deep text-forest-foreground'
                              : 'text-foreground/80 hover:bg-forest/5 hover:text-forest'
                          )
                        }
                      >
                        <item.icon className="size-4.5 flex-shrink-0" aria-hidden="true" />
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="h-9 w-9 rounded-full bg-forest-deep/10 flex items-center justify-center">
              <span className="font-display text-sm font-semibold text-forest">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-forest truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role?.replace('_', ' ')}</p>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className={cn('sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-border transition-all', scrolled ? 'shadow-sm' : '')}>
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Open sidebar"
              >
                <Menu className="size-6" aria-hidden="true" />
              </button>
              <h1 className="font-display text-xl font-semibold text-forest lg:hidden">
                {allNavItems.find(n => n.href === location.pathname)?.label || 'Dashboard'}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              {/* View Site Link */}
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-forest hover:bg-forest/5 transition-colors"
              >
                View Site
              </a>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Notifications" onClick={() => setNotificationsOpen(!notificationsOpen)}>
                <Bell className="size-5 text-foreground" aria-hidden="true" />
                <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-gold text-gold-foreground text-[10px] font-bold flex items-center justify-center">
                  3
                </span>
              </button>
              {notificationsOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-border z-50">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-semibold text-forest">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="p-3 hover:bg-muted/50 border-b border-border">
                      <p className="text-sm font-medium text-forest">New prayer request received</p>
                      <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                    </div>
                    <div className="p-3 hover:bg-muted/50 border-b border-border">
                      <p className="text-sm font-medium text-forest">Volunteer application pending</p>
                      <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                    </div>
                    <div className="p-3 hover:bg-muted/50">
                      <p className="text-sm font-medium text-forest">New partnership inquiry</p>
                      <p className="text-xs text-muted-foreground mt-1">3 hours ago</p>
                    </div>
                  </div>
                  <div className="p-3 border-t border-border">
                    <button className="text-sm text-gold hover:underline w-full text-center" onClick={() => setNotificationsOpen(false)}>Mark all as read</button>
                  </div>
                </div>
              )}

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                >
                  <div className="h-8 w-8 rounded-full bg-forest-deep/10 flex items-center justify-center">
                    <span className="font-display text-sm font-semibold text-forest">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-forest">{user?.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user?.role?.replace('_', ' ')}</p>
                  </div>
                  <ChevronDown className="size-4 text-muted-foreground" aria-hidden="true" />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-lg border border-border shadow-lg py-2 z-50"
                      role="menu"
                    >
                      <div className="px-4 py-2 border-b border-border">
                        <p className="text-sm font-medium text-forest">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                      <NavLink
                        to="/admin/settings"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-forest/5 transition-colors"
                        role="menuitem"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Settings className="size-4" aria-hidden="true" />
                        Settings
                      </NavLink>
                      <hr className="my-2 border-border" />
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        role="menuitem"
                      >
                        <LogOut className="size-4" aria-hidden="true" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Horizontal Admin Menu Bar */}
        <div className="hidden lg:block bg-forest-deep border-b border-border">
          <div className="px-6 flex items-center gap-1 overflow-x-auto">
            {allNavItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === '/admin'}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 px-4 py-2.5 text-[0.7rem] font-semibold uppercase tracking-wider whitespace-nowrap transition-colors',
                    isActive
                      ? 'text-gold border-b-2 border-gold'
                      : 'text-forest-foreground/70 hover:text-forest-foreground'
                  )
                }
              >
                <item.icon className="size-3.5" aria-hidden="true" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
