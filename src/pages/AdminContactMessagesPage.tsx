import { useState } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Search, Eye, Trash2, AlertTriangle, CheckCircle, Clock, Archive, Reply } from 'lucide-react';
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

const initialMessages = [
  { id: '1', name: 'John Doe', email: 'john@example.com', subject: 'Partnership Inquiry', message: 'We are interested in partnering with your organization...', status: 'new', createdAt: '2024-01-15' },
  { id: '2', name: 'Mary Smith', email: 'mary@example.com', subject: 'Volunteer Question', message: 'I would like to know more about volunteering opportunities...', status: 'read', createdAt: '2024-01-14' },
  { id: '3', name: 'Peter Ochieng', email: 'peter@health.go.ke', subject: 'Government Collaboration', message: 'The Ministry of Health would like to discuss...', status: 'replied', createdAt: '2024-01-10' },
];

export function AdminContactMessagesPage() {
  useSEO({ title: 'Contact Messages | Admin', description: 'Manage incoming contact form submissions', url: '/admin/contact-messages', noIndex: true, noFollow: true });
  const { items: messages, remove: removeMessage, updateStatus: updateMessageStatus } = useListState(initialMessages);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = messages.filter(m => 
    (m.name.toLowerCase().includes(search.toLowerCase()) || m.subject.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase())) &&
    (statusFilter === 'all' || m.status === statusFilter)
  );

  const statusConfig: Record<string, { label: string; color: string; icon: typeof AlertTriangle }> = {
    new: { label: 'New', color: 'bg-blue-100 text-blue-700', icon: AlertTriangle },
    read: { label: 'Read', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
    replied: { label: 'Replied', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    archived: { label: 'Archived', color: 'bg-gray-100 text-gray-700', icon: Archive },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-forest">Contact Messages</h1>
          <p className="text-muted-foreground mt-1">Manage incoming contact form submissions</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input placeholder="Search messages..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="h-10 px-3 rounded-lg border border-border bg-white text-sm">
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>From</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead className="w-32">Status</TableHead>
                <TableHead className="w-36">Received</TableHead>
                <TableHead className="w-48">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(message => {
                const config = statusConfig[message.status];
                const StatusIcon = config.icon;
                return (
                  <TableRow key={message.id}>
                    <TableCell>
                      <p className="font-medium text-forest">{message.name}</p>
                      <p className="text-sm text-muted-foreground">{message.email}</p>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-forest max-w-md truncate">{message.subject}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{message.message}</p>
                    </TableCell>
                    <TableCell>
                      <span className={cn('inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium', config.color)}>
                        <StatusIcon className="size-3" /> {config.label}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{new Date(message.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        {message.status === 'new' && (
                          <Button variant="ghost" size="sm" className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50" onClick={() => updateMessageStatus(message.id, 'read')}>
                            <Eye className="size-4 mr-1" /> Mark Read
                          </Button>
                        )}
                        {message.status === 'read' && (
                          <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => updateMessageStatus(message.id, 'replied')}>
                            <CheckCircle className="size-4 mr-1" /> Replied
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700" onClick={() => removeMessage(message.id)}><Trash2 className="size-4" /></Button>
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

export default AdminContactMessagesPage;