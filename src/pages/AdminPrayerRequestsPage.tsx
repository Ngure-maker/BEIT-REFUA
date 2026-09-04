import { useState } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Search, Heart, CheckCircle, Clock, AlertTriangle, ArrowRight, Trash2 } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Input } from '@/components/ui/Input';
import { cn } from '@/utils/cn';

function useListState<T extends { id: string }>(initial: T[]) {
  const [items, setItems] = useState(initial);
  const remove = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(prev => prev.filter(i => i.id !== id));
    }
  };
  const updateStatus = (id: string, status: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };
  return { items, remove, updateStatus };
}

const initialPrayers = [
  { id: '1', name: 'Mary W.', request: 'Pray for my son\'s healing from malaria', category: 'Healing', isAnonymous: false, status: 'new', createdAt: '2024-01-15', email: 'mary@example.com' },
  { id: '2', name: 'Anonymous', request: 'Pray for our family during financial difficulties', category: 'Provision', isAnonymous: true, status: 'praying', createdAt: '2024-01-14' },
  { id: '3', name: 'John K.', request: 'Thanksgiving for successful surgery', category: 'Thanksgiving', isAnonymous: false, status: 'answered', createdAt: '2024-01-10', email: 'john@example.com' },
];

export function AdminPrayerRequestsPage() {
  useSEO({ title: 'Prayer Requests | Admin', description: 'Manage and pray for community prayer requests', url: '/admin/prayer-requests', noIndex: true, noFollow: true });
  const { items: prayers, remove: removePrayer, updateStatus: updatePrayerStatus } = useListState(initialPrayers);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = prayers.filter(p => 
    p.request.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === 'all' || p.status === statusFilter)
  );

  const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
    new: { label: 'New', color: 'bg-blue-100 text-blue-700', icon: Clock },
    praying: { label: 'Praying', color: 'bg-yellow-100 text-yellow-700', icon: Heart },
    answered: { label: 'Answered', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    closed: { label: 'Closed', color: 'bg-gray-100 text-gray-700', icon: AlertTriangle },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-forest">Prayer Requests</h1>
          <p className="text-muted-foreground mt-1">Manage and pray for community prayer requests</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input placeholder="Search prayer requests..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="h-10 px-3 rounded-lg border border-border bg-white text-sm">
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="praying">Praying</option>
              <option value="answered">Answered</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request</TableHead>
                <TableHead className="w-32">Category</TableHead>
                <TableHead className="w-32">Status</TableHead>
                <TableHead className="w-36">Submitted</TableHead>
                <TableHead className="w-40">Submitted By</TableHead>
                <TableHead className="w-48">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(prayer => {
                const config = statusConfig[prayer.status];
                const StatusIcon = config.icon;
                return (
                  <TableRow key={prayer.id}>
                    <TableCell>
                      <p className="font-medium text-forest max-w-md truncate">{prayer.request}</p>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-forest/10 text-forest">{prayer.category}</span>
                    </TableCell>
                    <TableCell>
                      <span className={cn('inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium', config.color)}>
                        <StatusIcon className="size-3" /> {config.label}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{new Date(prayer.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{prayer.isAnonymous ? 'Anonymous' : prayer.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        {prayer.status === 'new' && (
                          <Button variant="ghost" size="sm" className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50" onClick={() => updatePrayerStatus(prayer.id, 'praying')}>
                            <Heart className="size-4 mr-1" /> Praying
                          </Button>
                        )}
                        {prayer.status === 'praying' && (
                          <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => updatePrayerStatus(prayer.id, 'answered')}>
                            <CheckCircle className="size-4 mr-1" /> Answered
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700" onClick={() => removePrayer(prayer.id)}><Trash2 className="size-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminPrayerRequestsPage;