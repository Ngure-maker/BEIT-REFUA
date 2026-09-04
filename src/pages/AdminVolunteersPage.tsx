import { useState } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Search, Eye, Edit, Trash2, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
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

const initialVolunteers = [
  { id: '1', name: 'Dr. Sarah Johnson', email: 'sarah@email.com', phone: '+254 700 111 111', profession: 'Physician', skills: ['General Medicine', 'Pediatrics'], availability: 'Weekends', status: 'pending', createdAt: '2024-01-15' },
  { id: '2', name: 'James Mwangi', email: 'james@email.com', phone: '+254 700 222 222', profession: 'Nurse', skills: ['Emergency Care', 'Wound Care'], availability: 'Weekdays', status: 'approved', createdAt: '2024-01-12' },
  { id: '3', name: 'Grace Wambui', email: 'grace@email.com', phone: '+254 700 333 333', profession: 'Pharmacist', skills: ['Pharmacy Management'], availability: 'Flexible', status: 'reviewing', createdAt: '2024-01-10' },
];

export function AdminVolunteersPage() {
  useSEO({ title: 'Volunteers | Admin', description: 'Review and manage volunteer applications', url: '/admin/volunteers', noIndex: true, noFollow: true });
  const { items: volunteers, remove: removeVolunteer, updateStatus: updateVolunteerStatus } = useListState(initialVolunteers);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = volunteers.filter(v => 
    (v.name.toLowerCase().includes(search.toLowerCase()) || v.profession.toLowerCase().includes(search.toLowerCase())) &&
    (statusFilter === 'all' || v.status === statusFilter)
  );

  const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
    pending: { label: 'Pending', color: 'bg-blue-100 text-blue-700', icon: Clock },
    reviewing: { label: 'Reviewing', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
    approved: { label: 'Approved', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700', icon: AlertTriangle },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-forest">Volunteer Applications</h1>
          <p className="text-muted-foreground mt-1">Review and manage volunteer applications</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input placeholder="Search volunteers..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="h-10 px-3 rounded-lg border border-border bg-white text-sm">
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="reviewing">Reviewing</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Profession</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead className="w-32">Availability</TableHead>
                <TableHead className="w-32">Status</TableHead>
                <TableHead className="w-36">Applied</TableHead>
                <TableHead className="w-48">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(volunteer => {
                const config = statusConfig[volunteer.status];
                const StatusIcon = config.icon;
                return (
                  <TableRow key={volunteer.id}>
                    <TableCell>
                      <p className="font-medium text-forest">{volunteer.name}</p>
                      <p className="text-sm text-muted-foreground">{volunteer.email}</p>
                    </TableCell>
                    <TableCell>{volunteer.profession}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {volunteer.skills.map(s => <span key={s} className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">{s}</span>)}
                      </div>
                    </TableCell>
                    <TableCell>{volunteer.availability}</TableCell>
                    <TableCell>
                      <span className={cn('inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium', config.color)}>
                        <StatusIcon className="size-3" /> {config.label}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{new Date(volunteer.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        {(volunteer.status === 'pending' || volunteer.status === 'reviewing') && (
                          <>
                            <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => updateVolunteerStatus(volunteer.id, 'approved')}>
                              <CheckCircle className="size-4 mr-1" /> Approve
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => updateVolunteerStatus(volunteer.id, 'rejected')}>
                              <AlertTriangle className="size-4 mr-1" /> Reject
                            </Button>
                          </>
                        )}
                        <Button variant="ghost" size="icon" asChild><Link to={`/admin/volunteers/${volunteer.id}`}><Eye className="size-4" /></Link></Button>
                        <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700" onClick={() => removeVolunteer(volunteer.id)}><Trash2 className="size-4" /></Button>
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

export default AdminVolunteersPage;