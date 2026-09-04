import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Users, FileText, Image, BarChart3, Heart, TrendingUp, BookOpen, Plus, Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

const stats = [
  { label: 'Total Programs', value: '12', change: '+2 this month', icon: FileText, color: 'text-blue-600 bg-blue-100', href: '/admin/programs' },
  { label: 'Published Stories', value: '28', change: '+5 this month', icon: BookOpen, color: 'text-green-600 bg-green-100', href: '/admin/stories' },
  { label: 'Gallery Images', value: '59', change: '+12 this week', icon: Image, color: 'text-purple-600 bg-purple-100', href: '/admin/gallery' },
  { label: 'Impact Reports', value: '8', change: '+1 this quarter', icon: BarChart3, color: 'text-orange-600 bg-orange-100', href: '/admin/impact-reports' },
];

const recentActivity = [
  { id: '1', type: 'program', action: 'created', title: 'Mobile Clinic Outreach Program', time: '2 hours ago', user: 'Admin User', status: 'draft', href: '/admin/programs/1/edit' },
  { id: '2', type: 'story', action: 'published', title: 'Hope Restored: Mary\'s Journey', time: '5 hours ago', user: 'Sarah M.', status: 'published', href: '/admin/stories/1/edit' },
  { id: '3', type: 'image', action: 'uploaded', title: 'New clinic wing photos', time: '1 day ago', user: 'John K.', status: 'published', href: '/admin/gallery/3' },
  { id: '4', type: 'report', action: 'updated', title: 'Q3 2024 Impact Report', time: '2 days ago', user: 'Admin User', status: 'review', href: '/admin/impact-reports/3/edit' },
  { id: '5', type: 'prayer', action: 'received', title: 'New prayer request', time: '3 days ago', user: 'Anonymous', status: 'new', href: '/admin/prayer-requests/1' },
];

const pendingItems = [
  { id: '1', type: 'Prayer Requests', count: 12, icon: Heart, color: 'text-red-600 bg-red-100', href: '/admin/prayer-requests' },
  { id: '2', type: 'Volunteer Applications', count: 5, icon: Users, color: 'text-blue-600 bg-blue-100', href: '/admin/volunteers' },
  { id: '3', type: 'Partnership Inquiries', count: 3, icon: TrendingUp, color: 'text-green-600 bg-green-100', href: '/admin/partnerships' },
  { id: '4', type: 'Contact Messages', count: 8, icon: FileText, color: 'text-purple-600 bg-purple-100', href: '/admin/contact-messages' },
];

export function AdminDashboardPage() {
  useSEO({
    title: 'Dashboard | Admin | Beit-Refuah',
    description: 'Admin dashboard overview for Beit-Refuah management',
    url: '/admin',
    noIndex: true,
    noFollow: true,
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-forest">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with your content.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/page-editor" className="inline-flex items-center gap-2 rounded-lg border border-gold bg-gold/10 px-4 py-2 text-sm font-semibold text-gold hover:bg-gold/20 transition-colors">
            <Pencil className="size-4" aria-hidden="true" />
            Edit Site
          </Link>
          <Link to="/admin/programs/new" className="inline-flex items-center gap-2 rounded-lg bg-forest-deep px-4 py-2 text-sm font-semibold text-forest-foreground hover:bg-forest-deep/90 transition-colors">
            <Plus className="size-4" aria-hidden="true" />
            Quick Add
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} to={stat.href} className="block">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="font-display text-3xl font-bold text-forest mt-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </div>
                  <div className={cn('h-12 w-12 rounded-xl flex items-center justify-center', stat.color)}>
                    <stat.icon className="size-6" aria-hidden="true" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <Link to="/admin/activity" className="text-sm text-gold hover:underline">View All</Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {recentActivity.map((activity) => (
                  <Link key={activity.id} to={activity.href} className="flex items-center gap-4 p-4 hover:bg-forest/5 transition-colors">
                    <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0', 
                      activity.type === 'program' && 'bg-blue-100 text-blue-600',
                      activity.type === 'story' && 'bg-green-100 text-green-600',
                      activity.type === 'image' && 'bg-purple-100 text-purple-600',
                      activity.type === 'report' && 'bg-orange-100 text-orange-600',
                      activity.type === 'prayer' && 'bg-red-100 text-red-600'
                    )}>
                      {activity.type === 'program' && <FileText className="size-5" />}
                      {activity.type === 'story' && <FileText className="size-5" />}
                      {activity.type === 'image' && <Image className="size-5" />}
                      {activity.type === 'report' && <BarChart3 className="size-5" />}
                      {activity.type === 'prayer' && <Heart className="size-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-forest truncate">{activity.title}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span>{activity.action.charAt(0).toUpperCase() + activity.action.slice(1)}</span>
                        <span>•</span>
                        <span>{activity.time}</span>
                        <span>•</span>
                        <span>by {activity.user}</span>
                      </div>
                    </div>
                    <span className={cn(
                      'px-2 py-1 rounded-full text-xs font-medium',
                      activity.status === 'published' && 'bg-green-100 text-green-700',
                      activity.status === 'draft' && 'bg-gray-100 text-gray-700',
                      activity.status === 'review' && 'bg-yellow-100 text-yellow-700',
                      activity.status === 'new' && 'bg-blue-100 text-blue-700'
                    )}>
                      {activity.status}
                    </span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Items */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Requires Attention</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {pendingItems.map((item) => (
                  <Link key={item.id} to={item.href} className="flex items-center justify-between p-4 hover:bg-forest/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center', item.color)}>
                        <item.icon className="size-5" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-forest">{item.type}</p>
                        <p className="text-xs text-muted-foreground">Pending review</p>
                      </div>
                    </div>
                    <span className={cn('h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold', item.color.replace('bg-', 'bg-').replace('text-', 'text-'))}>
                      {item.count}
                    </span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                <Link to="/admin/page-editor" className="p-4 rounded-lg border-2 border-gold/30 bg-gold/5 hover:border-gold hover:bg-gold/10 transition-colors text-center">
                  <Pencil className="size-8 mx-auto text-gold mb-2" aria-hidden="true" />
                  <p className="text-sm font-medium text-forest">Edit Site</p>
                </Link>
                <Link to="/admin/programs/new" className="p-4 rounded-lg border border-border hover:border-gold hover:bg-forest/5 transition-colors text-center">
                  <FileText className="size-8 mx-auto text-forest mb-2" aria-hidden="true" />
                  <p className="text-sm font-medium text-forest">Add Program</p>
                </Link>
                <Link to="/admin/stories/new" className="p-4 rounded-lg border border-border hover:border-gold hover:bg-forest/5 transition-colors text-center">
                  <BookOpen className="size-8 mx-auto text-forest mb-2" aria-hidden="true" />
                  <p className="text-sm font-medium text-forest">Write Story</p>
                </Link>
                <Link to="/admin/gallery/upload" className="p-4 rounded-lg border border-border hover:border-gold hover:bg-forest/5 transition-colors text-center">
                  <Image className="size-8 mx-auto text-forest mb-2" aria-hidden="true" />
                  <p className="text-sm font-medium text-forest">Upload Images</p>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;