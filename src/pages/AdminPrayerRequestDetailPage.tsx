import { useParams, Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Heart, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { cn } from '@/utils/cn';

const mockPrayers: Record<string, { name: string; request: string; category: string; isAnonymous: boolean; status: string; createdAt: string; email?: string }> = {
  '1': { name: 'Mary W.', request: "Pray for my son's healing from malaria", category: 'Healing', isAnonymous: false, status: 'new', createdAt: '2024-01-15', email: 'mary@example.com' },
  '2': { name: 'Anonymous', request: 'Pray for our family during financial difficulties', category: 'Provision', isAnonymous: true, status: 'praying', createdAt: '2024-01-14' },
  '3': { name: 'John K.', request: 'Thanksgiving for successful surgery', category: 'Thanksgiving', isAnonymous: false, status: 'answered', createdAt: '2024-01-10', email: 'john@example.com' },
};

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  new: { label: 'New', color: 'bg-blue-100 text-blue-700', icon: Clock },
  praying: { label: 'Praying', color: 'bg-yellow-100 text-yellow-700', icon: Heart },
  answered: { label: 'Answered', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  closed: { label: 'Closed', color: 'bg-gray-100 text-gray-700', icon: AlertTriangle },
};

export function AdminPrayerRequestDetailPage() {
  const { id } = useParams<{ id: string }>();
  useSEO({ title: 'Prayer Request Detail | Admin', description: 'View prayer request details', url: `/admin/prayer-requests/${id}`, noIndex: true, noFollow: true });

  const prayer = mockPrayers[id || ''] || mockPrayers['1'];
  const config = statusConfig[prayer.status];
  const StatusIcon = config.icon;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/admin/prayer-requests"><ArrowLeft className="size-5" /></Link>
        </Button>
        <div>
          <h1 className="font-display text-3xl font-bold text-forest">Prayer Request</h1>
          <p className="text-muted-foreground mt-1">View and manage this prayer request</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h2 className="font-display text-xl font-semibold text-forest mb-4">Request Details</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Prayer Request</label>
                <p className="mt-1 text-forest">{prayer.request}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Category</label>
                  <p className="mt-1"><span className="px-2 py-1 rounded text-xs font-medium bg-forest/10 text-forest">{prayer.category}</span></p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <p className="mt-1">
                    <span className={cn('inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium', config.color)}>
                      <StatusIcon className="size-3" /> {config.label}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="font-display text-xl font-semibold text-forest">Actions</h2>
            <div className="space-y-2">
              <Button className="w-full" onClick={() => alert('Marked as praying for this request')}>
                <Heart className="size-4 mr-2" /> Start Praying
              </Button>
              <Button className="w-full" variant="outline" onClick={() => alert('Marked as answered')}>
                <CheckCircle className="size-4 mr-2" /> Mark Answered
              </Button>
              <Button className="w-full" variant="outline" onClick={() => alert('Request closed')}>
                <AlertTriangle className="size-4 mr-2" /> Close Request
              </Button>
            </div>
            <hr className="border-border" />
            <div className="space-y-2 text-sm">
              <div><span className="font-medium text-muted-foreground">Submitted by:</span> <span className="text-forest">{prayer.isAnonymous ? 'Anonymous' : prayer.name}</span></div>
              {!prayer.isAnonymous && prayer.email && <div><span className="font-medium text-muted-foreground">Email:</span> <span className="text-forest">{prayer.email}</span></div>}
              <div><span className="font-medium text-muted-foreground">Date:</span> <span className="text-forest">{new Date(prayer.createdAt).toLocaleDateString()}</span></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminPrayerRequestDetailPage;
