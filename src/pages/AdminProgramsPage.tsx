import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Eye, FileText, Download, Upload } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useSEO } from '@/hooks/useSEO';
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

interface Program {
  id: string;
  title: string;
  slug: string;
  category: 'current' | 'development' | 'future';
  status: 'draft' | 'published' | 'archived';
  order: number;
  updatedAt: string;
  createdAt: string;
}

const initialPrograms: Program[] = [
  { id: '1', title: 'Community Clinic', slug: 'community-clinic', category: 'current', status: 'published', order: 1, updatedAt: '2024-01-15', createdAt: '2023-06-01' },
  { id: '2', title: 'Mobile Health Outreach', slug: 'mobile-health-outreach', category: 'current', status: 'published', order: 2, updatedAt: '2024-01-10', createdAt: '2023-07-15' },
  { id: '3', title: 'Maternal & Child Health', slug: 'maternal-child-health', category: 'current', status: 'published', order: 3, updatedAt: '2024-01-05', createdAt: '2023-08-01' },
  { id: '4', title: 'Mental Health Support', slug: 'mental-health-support', category: 'development', status: 'draft', order: 1, updatedAt: '2024-01-12', createdAt: '2023-11-01' },
  { id: '5', title: 'Dental Care Program', slug: 'dental-care-program', category: 'development', status: 'draft', order: 2, updatedAt: '2024-01-08', createdAt: '2023-12-01' },
  { id: '6', title: 'Telemedicine Platform', slug: 'telemedicine-platform', category: 'future', status: 'draft', order: 1, updatedAt: '2024-01-01', createdAt: '2024-01-01' },
];

export function AdminProgramsPage() {
  useSEO({
    title: 'Programs | Admin | Beit-Refuah',
    description: 'Manage programs for Beit-Refuah',
    url: '/admin/programs',
    noIndex: true,
    noFollow: true,
  });

  const { items: programs, remove: removeProgram, updateStatus: updateProgramStatus } = useListState(initialPrograms);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'title' | 'category' | 'status' | 'updatedAt'>('updatedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredPrograms = programs
    .filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.slug.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const statusColors = {
    published: 'bg-green-100 text-green-700',
    draft: 'bg-gray-100 text-gray-700',
    archived: 'bg-red-100 text-red-700',
  };

  const categoryColors = {
    current: 'bg-blue-100 text-blue-700',
    development: 'bg-yellow-100 text-yellow-700',
    future: 'bg-purple-100 text-purple-700',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-forest">Programs</h1>
          <p className="text-muted-foreground mt-1">Manage healthcare programs and initiatives</p>
        </div>
        <Link to="/admin/programs/new">
          <Button>
            <Plus className="size-4 mr-2" aria-hidden="true" />
            Add Program
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" aria-hidden="true" />
              <Input
                placeholder="Search programs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="h-10 px-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              >
                <option value="all">All Categories</option>
                <option value="current">Current</option>
                <option value="development">In Development</option>
                <option value="future">Future</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-10 px-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              >
                <option value="all">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Programs Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Order</TableHead>
                <TableHead onClick={() => handleSort('title')} className="cursor-pointer select-none flex items-center gap-1">
                  Title
                  {sortBy === 'title' && (sortOrder === 'asc' ? <span>↑</span> : <span>↓</span>)}
                </TableHead>
                <TableHead onClick={() => handleSort('category')} className="cursor-pointer select-none flex items-center gap-1">
                  Category
                  {sortBy === 'category' && (sortOrder === 'asc' ? <span>↑</span> : <span>↓</span>)}
                </TableHead>
                <TableHead onClick={() => handleSort('status')} className="cursor-pointer select-none flex items-center gap-1">
                  Status
                  {sortBy === 'status' && (sortOrder === 'asc' ? <span>↑</span> : <span>↓</span>)}
                </TableHead>
                <TableHead onClick={() => handleSort('updatedAt')} className="cursor-pointer select-none flex items-center gap-1">
                  Last Updated
                  {sortBy === 'updatedAt' && (sortOrder === 'asc' ? <span>↑</span> : <span>↓</span>)}
                </TableHead>
                <TableHead className="w-48">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrograms.map((program) => (
                <TableRow key={program.id}>
                  <TableCell className="font-mono text-sm font-medium">{program.order}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-forest">{program.title}</p>
                      <p className="text-xs text-muted-foreground">/{program.slug}/</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', categoryColors[program.category])}>
                      {program.category.charAt(0).toUpperCase() + program.category.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', statusColors[program.status])}>
                      {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(program.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {program.status === 'draft' && (
                        <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => updateProgramStatus(program.id, 'published')}>
                          Publish
                        </Button>
                      )}
                      {program.status === 'published' && (
                        <Button variant="ghost" size="sm" className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50" onClick={() => updateProgramStatus(program.id, 'draft')}>
                          Unpublish
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => removeProgram(program.id)}>
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredPrograms.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12">
                    <FileText className="size-12 mx-auto text-muted-foreground mb-4" aria-hidden="true" />
                    <p className="text-muted-foreground">No programs found</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredPrograms.length} of {programs.length} programs
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => window.alert('Export feature coming soon!')}><Download className="size-4 mr-2" />Export</Button>
          <Button variant="outline" size="sm" onClick={() => window.alert('Import feature coming soon!')}><Upload className="size-4 mr-2" />Import</Button>
        </div>
      </div>
    </div>
  );
}

export default AdminProgramsPage;