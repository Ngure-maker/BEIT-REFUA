import { useState } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Search, Eye, Edit, Trash2, Users, Mail, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Input } from '@/components/ui/Input';
import { Link } from 'react-router-dom';
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

const initialPartnerships = [
  { id: '1', orgName: 'Kenya Ministry of Health', contactName: 'Dr. Peter Ochieng', email: 'peter@health.go.ke', phone: '+254 700 111 111', type: 'government', interests: ['Healthcare Policy', 'Funding', 'Infrastructure'], status: 'partnered', createdAt: '2023-06-01' },
  { id: '2', orgName: 'World Vision Kenya', contactName: 'Mary Wanjiku', email: 'mary@worldvision.org', phone: '+254 700 222 222', type: 'ngo', interests: ['Child Health', 'Community Programs', 'Capacity Building'], status: 'in-discussion', createdAt: '2024-01-10' },
  { id: '3', orgName: 'Kakamega County Hospital', contactName: 'Dr. James Kiprotich', email: 'james@kakamegahospital.go.ke', phone: '+254 700 333 333', type: 'medical', interests: ['Referral Network', 'Training', 'Equipment Sharing'], status: 'new', createdAt: '2024-01-15' },
];

export function AdminPartnershipsPage() {
  useSEO({ title: 'Partnerships | Admin', description: 'Manage partnership inquiries and relationships', url: '/admin/partnerships', noIndex: true, noFollow: true });
  const { items: partnerships, remove: removePartnership, updateStatus: updatePartnershipStatus } = useListState(initialPartnerships);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = partnerships.filter(p => 
    (p.orgName.toLowerCase().includes(search.toLowerCase()) || p.contactName.toLowerCase().includes(search.toLowerCase())) &&
    (statusFilter === 'all' || p.status === statusFilter)
  );

  const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
    new: { label: 'New Inquiry', color: 'bg-blue-100 text-blue-700', icon: Clock },
    contacted: { label: 'Contacted', color: 'bg-purple-100 text-purple-700', icon: Mail },
    'in-discussion': { label: 'In Discussion', color: 'bg-yellow-100 text-yellow-700', icon: Users },
    partnered: { label: 'Partnered', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    declined: { label: 'Declined', color: 'bg-red-100 text-red-700', icon: AlertTriangle },
  };

  const typeConfig: Record<string, { label: string; color: string }> = {
    church: { label: 'Church', color: 'bg-blue-100 text-blue-700' },
    ngo: { label: 'NGO', color: 'bg-green-100 text-green-700' },
    government: { label: 'Government', color: 'bg-purple-100 text-purple-700' },
    medical: { label: 'Medical', color: 'bg-red-100 text-red-700' },
    business: { label: 'Business', color: 'bg-yellow-100 text-yellow-700' },
    other: { label: 'Other', color: 'bg-gray-100 text-gray-700' },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-forest">Partnerships</h1>
          <p className="text-muted-foreground mt-1">Manage partnership inquiries and relationships</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input placeholder="Search partnerships..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="h-10 px-3 rounded-lg border border-border bg-white text-sm">
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="in-discussion">In Discussion</option>
              <option value="partnered">Partnered</option>
              <option value="declined">Declined</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead className="w-32">Type</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Interests</TableHead>
                <TableHead className="w-36">Status</TableHead>
                <TableHead className="w-36">Since</TableHead>
                <TableHead className="w-48">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(partnership => {
                const config = statusConfig[partnership.status];
                const StatusIcon = config.icon;
                const typeInfo = typeConfig[partnership.type];
                return (
                  <TableRow key={partnership.id}>
                    <TableCell>
                      <p className="font-medium text-forest">{partnership.orgName}</p>
                    </TableCell>
                    <TableCell>
                      <span className={cn('inline-flex items-center px-2 py-1 rounded text-xs font-medium', typeInfo.color)}>
                        {typeInfo.label}
                      </span>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{partnership.contactName}</p>
                      <p className="text-xs text-muted-foreground">{partnership.email}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {partnership.interests.map(i => <span key={i} className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">{i}</span>)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={cn('inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium', config.color)}>
                        <StatusIcon className="size-3" /> {config.label}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{new Date(partnership.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        {partnership.status === 'new' && (
                          <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50" onClick={() => updatePartnershipStatus(partnership.id, 'contacted')}>
                            <Mail className="size-4 mr-1" /> Contacted
                          </Button>
                        )}
                        {partnership.status === 'contacted' && (
                          <Button variant="ghost" size="sm" className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50" onClick={() => updatePartnershipStatus(partnership.id, 'in-discussion')}>
                            <Users className="size-4 mr-1" /> Discuss
                          </Button>
                        )}
                        {partnership.status === 'in-discussion' && (
                          <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => updatePartnershipStatus(partnership.id, 'partnered')}>
                            <CheckCircle className="size-4 mr-1" /> Partner
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700" onClick={() => removePartnership(partnership.id)}><Trash2 className="size-4" /></Button>
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

export default AdminPartnershipsPage;