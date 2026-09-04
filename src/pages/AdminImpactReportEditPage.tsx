import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { ArrowLeft, Save, X } from 'lucide-react';

const mockReports: Record<string, { title: string; description: string; period: string; fileType: string; isPublished: boolean }> = {
  '1': { title: 'Q4 2023 Impact Report', description: 'Comprehensive overview of healthcare services delivered, patients served, and community impact.', period: 'Q4 2023', fileType: 'pdf', isPublished: true },
  '2': { title: 'Annual Report 2023', description: 'Full year summary of programs, achievements, financials, and future plans.', period: '2023', fileType: 'pdf', isPublished: true },
  '3': { title: 'Q1 2024 Impact Report', description: 'Quarterly impact summary (Draft).', period: 'Q1 2024', fileType: 'pdf', isPublished: false },
};

export function AdminImpactReportEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  useSEO({ title: 'Edit Impact Report | Admin', description: 'Edit impact report', url: `/admin/impact-reports/${id}/edit`, noIndex: true, noFollow: true });

  const data = mockReports[id || ''] || mockReports['1'];
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [period, setPeriod] = useState(data.period);
  const [isPublished, setIsPublished] = useState(data.isPublished);
  const [coverImage, setCoverImage] = useState<{ file: File | null; preview: string | null }>({ file: null, preview: null });

  const handleSave = () => {
    alert('Impact report updated successfully!');
    navigate('/admin/impact-reports');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild><Link to="/admin/impact-reports"><ArrowLeft className="size-5" /></Link></Button>
        <div className="flex-1">
          <h1 className="font-display text-3xl font-bold text-forest">Edit Impact Report</h1>
          <p className="text-muted-foreground mt-1">Update report details and cover image</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/admin/impact-reports')}><X className="size-4 mr-2" /> Cancel</Button>
          <Button onClick={handleSave}><Save className="size-4 mr-2" /> Save Changes</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6 space-y-4">
            <div><label className="text-sm font-medium text-muted-foreground">Title</label><Input value={title} onChange={e => setTitle(e.target.value)} className="mt-1" /></div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="text-sm font-medium text-muted-foreground">Period</label><Input value={period} onChange={e => setPeriod(e.target.value)} className="mt-1" /></div>
              <div className="flex items-end"><div className="flex items-center gap-2"><input type="checkbox" checked={isPublished} onChange={e => setIsPublished(e.target.checked)} className="h-4 w-4 rounded border-border text-gold" /><label className="text-sm font-medium text-muted-foreground">Published</label></div></div>
            </div>
            <div><label className="text-sm font-medium text-muted-foreground">Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} className="mt-1 w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
            </div>
          </CardContent>
        </Card>

        {/* Cover Image */}
        <Card>
          <CardContent className="p-6">
            <ImageUpload
              label="Cover Image"
              value={coverImage.preview || undefined}
              onChange={(file, preview) => setCoverImage({ file, preview })}
              hint="Thumbnail image for report listings"
              aspect="video"
              allowCrop={false}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminImpactReportEditPage;
