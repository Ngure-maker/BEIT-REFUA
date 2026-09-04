import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, FileText, Download, Upload, Eye, Edit, Trash2, CheckCircle, Clock, BarChart3 } from 'lucide-react';
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
  const togglePublished = (id: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, isPublished: !i.isPublished } : i));
  };
  return { items, remove, togglePublished };
}

interface ImpactReport {
  id: string;
  title: string;
  description: string;
  period: string;
  year: number;
  fileType: 'pdf' | 'docx' | 'xlsx';
  fileSize: string;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

const initialReports: ImpactReport[] = [
  { id: '1', title: 'Annual Impact Report 2023', description: 'Comprehensive overview of our impact across all programs in 2023', period: 'Annual', year: 2023, fileType: 'pdf', fileSize: '4.2 MB', isPublished: true, publishedAt: '2024-01-15', createdAt: '2024-01-10', updatedAt: '2024-01-15' },
  { id: '2', title: 'Q4 2023 Quarterly Report', description: 'Quarterly impact metrics and financial summary for Q4 2023', period: 'Quarterly', year: 2023, fileType: 'pdf', fileSize: '2.8 MB', isPublished: true, publishedAt: '2024-01-05', createdAt: '2024-01-02', updatedAt: '2024-01-05' },
  { id: '3', title: 'Maternal Health Program Report', description: 'Detailed outcomes from our maternal and child health program', period: 'Program', year: 2023, fileType: 'pdf', fileSize: '3.5 MB', isPublished: true, publishedAt: '2023-12-20', createdAt: '2023-12-15', updatedAt: '2023-12-20' },
  { id: '4', title: 'Mobile Clinic Impact Assessment', description: 'Assessment of mobile clinic reach and effectiveness in rural areas', period: 'Program', year: 2023, fileType: 'docx', fileSize: '1.9 MB', isPublished: false, createdAt: '2024-01-12', updatedAt: '2024-01-12' },
  { id: '5', title: 'Financial Accountability Report 2023', description: 'Audited financial statements and fund allocation breakdown', period: 'Annual', year: 2023, fileType: 'xlsx', fileSize: '850 KB', isPublished: true, publishedAt: '2024-01-20', createdAt: '2024-01-18', updatedAt: '2024-01-20' },
  { id: '6', title: 'Q1 2024 Draft Report', description: 'Draft quarterly report for Q1 2024 - pending review', period: 'Quarterly', year: 2024, fileType: 'pdf', fileSize: '2.1 MB', isPublished: false, createdAt: '2024-01-14', updatedAt: '2024-01-14' },
];

export function AdminImpactReportsPage() {
  useSEO({
    title: 'Impact Reports | Admin | Beit-Refuah',
    description: 'Manage impact reports and publications for Beit-Refuah',
    url: '/admin/impact-reports',
    noIndex: true,
    noFollow: true,
  });

  const { items: reports, remove: removeReport, togglePublished: toggleReportPublished } = useListState(initialReports);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [periodFilter, setPeriodFilter] = useState('all');

  const filteredReports = reports.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || (statusFilter === 'published' && r.isPublished) || (statusFilter === 'draft' && !r.isPublished);
    const matchesPeriod = periodFilter === 'all' || r.period.toLowerCase() === periodFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesPeriod;
  });

  const fileTypeIcons = {
    pdf: { icon: FileText, color: 'text-red-600 bg-red-100' },
    docx: { icon: FileText, color: 'text-blue-600 bg-blue-100' },
    xlsx: { icon: FileText, color: 'text-green-600 bg-green-100' },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-forest">Impact Reports</h1>
          <p className="text-muted-foreground mt-1">Manage and publish impact reports and publications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild><Link to="/admin/impact-reports/import"><Upload className="size-4 mr-2" />Import</Link></Button>
          <Button asChild><Link to="/admin/impact-reports/new"><Plus className="size-4 mr-2" />Create Report</Link></Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" aria-hidden="true" />
              <Input placeholder="Search reports..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <div className="flex gap-2">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-10 px-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold">
                <option value="all">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
              <select value={periodFilter} onChange={(e) => setPeriodFilter(e.target.value)} className="h-10 px-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold">
                <option value="all">All Periods</option>
                <option value="annual">Annual</option>
                <option value="quarterly">Quarterly</option>
                <option value="program">Program</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">File</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="w-32">Period</TableHead>
                <TableHead className="w-24">Year</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="w-24">Size</TableHead>
                <TableHead className="w-36">Status</TableHead>
                <TableHead className="w-40">Published</TableHead>
                <TableHead className="w-48">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => {
                const fileInfo = fileTypeIcons[report.fileType];
                const FileIcon = fileInfo.icon;
                return (
                  <TableRow key={report.id}>
                    <TableCell>
                      <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center', fileInfo.color)}>
                        <FileIcon className="size-5" aria-hidden="true" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-forest">{report.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{report.description}</p>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-forest/10 text-forest">
                        {report.period}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium text-forest">{report.year}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-muted text-muted-foreground">
                        {report.fileType.toUpperCase()}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{report.fileSize}</TableCell>
                    <TableCell>
                      <span className={cn('inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium',
                        report.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      )}>
                        {report.isPublished ? <CheckCircle className="size-3" /> : <Clock className="size-3" />}
                        {report.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {report.publishedAt ? new Date(report.publishedAt).toLocaleDateString() : '—'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" className={cn(report.isPublished ? "text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50" : "text-green-600 hover:text-green-700 hover:bg-green-50")} onClick={() => toggleReportPublished(report.id)}>
                          {report.isPublished ? 'Unpublish' : 'Publish'}
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => removeReport(report.id)}>
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredReports.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-12">
                    <BarChart3 className="size-12 mx-auto text-muted-foreground mb-4" aria-hidden="true" />
                    <p className="text-muted-foreground">No reports found</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredReports.length} of {reports.length} reports
        </p>
      </div>
    </div>
  );
}

export default AdminImpactReportsPage;