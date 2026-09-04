import { useParams, Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Edit, ExternalLink, Download, Trash2 } from 'lucide-react';
import { cn } from '@/utils/cn';

const mockReports: Record<string, { title: string; description: string; period: string; fileType: string; isPublished: boolean; publishedAt?: string; createdAt: string }> = {
  '1': { title: 'Q4 2023 Impact Report', description: 'Comprehensive overview of healthcare services delivered, patients served, and community impact.', period: 'Q4 2023', fileType: 'pdf', isPublished: true, publishedAt: '2024-01-10', createdAt: '2024-01-08' },
  '2': { title: 'Annual Report 2023', description: 'Full year summary of programs, achievements, financials, and future plans.', period: '2023', fileType: 'pdf', isPublished: true, publishedAt: '2024-01-05', createdAt: '2024-01-01' },
  '3': { title: 'Q1 2024 Impact Report', description: 'Quarterly impact summary (Draft).', period: 'Q1 2024', fileType: 'pdf', isPublished: false, createdAt: '2024-01-15' },
};

export function AdminImpactReportDetailPage() {
  const { id } = useParams<{ id: string }>();
  useSEO({ title: 'Impact Report Detail | Admin', description: 'View impact report details', url: `/admin/impact-reports/${id}`, noIndex: true, noFollow: true });

  const report = mockReports[id || ''] || mockReports['1'];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/admin/impact-reports"><ArrowLeft className="size-5" /></Link>
        </Button>
        <div className="flex-1">
          <h1 className="font-display text-3xl font-bold text-forest">{report.title}</h1>
          <p className="text-muted-foreground mt-1">Impact report details</p>
        </div>
        <Button variant="outline" asChild>
          <Link to={report.isPublished ? `/impact-reports/${id}` : '#'} target="_blank"><ExternalLink className="size-4 mr-2" /> View Public</Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-6 space-y-6">
            <h2 className="font-display text-xl font-semibold text-forest">Report Information</h2>
            <p className="text-forest">{report.description}</p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div><span className="font-medium text-muted-foreground">Period:</span> <span className="text-forest">{report.period}</span></div>
              <div><span className="font-medium text-muted-foreground">File Type:</span> <span className="text-forest uppercase">{report.fileType}</span></div>
              <div><span className="font-medium text-muted-foreground">Created:</span> <span className="text-forest">{new Date(report.createdAt).toLocaleDateString()}</span></div>
              {report.publishedAt && <div><span className="font-medium text-muted-foreground">Published:</span> <span className="text-forest">{new Date(report.publishedAt).toLocaleDateString()}</span></div>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="font-display text-xl font-semibold text-forest">Actions</h2>
            <div className="space-y-2">
              <Button className="w-full" asChild>
                <Link to={`/admin/impact-reports/${id}/edit`}><Edit className="size-4 mr-2" /> Edit Report</Link>
              </Button>
              <Button className="w-full" variant="outline" onClick={() => alert('Download started')}>
                <Download className="size-4 mr-2" /> Download File
              </Button>
              <Button className="w-full" variant="destructive" onClick={() => alert('Report deleted')}>
                <Trash2 className="size-4 mr-2" /> Delete Report
              </Button>
            </div>
            <hr className="border-border" />
            <div>
              <span className="font-medium text-muted-foreground text-sm">Status:</span>
              <p className="mt-1">
                <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', report.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700')}>
                  {report.isPublished ? 'Published' : 'Draft'}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminImpactReportDetailPage;
