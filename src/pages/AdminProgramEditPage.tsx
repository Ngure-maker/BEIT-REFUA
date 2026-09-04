import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ImageUpload, ImageGallery } from '@/components/admin/ImageUpload';
import { ArrowLeft, Save, X } from 'lucide-react';

interface ProgramImage {
  id: string;
  src: string;
  alt: string;
}

const mockPrograms: Record<string, { title: string; slug: string; category: string; status: string; order: number }> = {
  '1': { title: 'Community Clinic', slug: 'community-clinic', category: 'current', status: 'published', order: 1 },
  '2': { title: 'Mobile Health Outreach', slug: 'mobile-health-outreach', category: 'current', status: 'published', order: 2 },
  '3': { title: 'Maternal & Child Health', slug: 'maternal-child-health', category: 'current', status: 'published', order: 3 },
  '4': { title: 'Mental Health Support', slug: 'mental-health-support', category: 'development', status: 'draft', order: 1 },
  '5': { title: 'Dental Care Program', slug: 'dental-care-program', category: 'development', status: 'draft', order: 2 },
  '6': { title: 'Telemedicine Platform', slug: 'telemedicine-platform', category: 'future', status: 'draft', order: 1 },
};

export function AdminProgramEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  useSEO({ title: 'Edit Program | Admin', description: 'Edit program details', url: `/admin/programs/${id}/edit`, noIndex: true, noFollow: true });

  const data = mockPrograms[id || ''] || mockPrograms['1'];
  const [title, setTitle] = useState(data.title);
  const [slug, setSlug] = useState(data.slug);
  const [category, setCategory] = useState(data.category);
  const [status, setStatus] = useState(data.status);
  const [order, setOrder] = useState(data.order);
  const [featuredImage, setFeaturedImage] = useState<{ file: File | null; preview: string | null }>({ file: null, preview: null });
  const [galleryImages, setGalleryImages] = useState<ProgramImage[]>([]);

  const handleAddGalleryImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setGalleryImages(prev => [...prev, { id: Math.random().toString(36).slice(2), src: e.target?.result as string, alt: file.name }]);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveGalleryImage = (imgId: string) => {
    setGalleryImages(prev => prev.filter(i => i.id !== imgId));
  };

  const handleSave = () => {
    alert('Program updated successfully!');
    navigate('/admin/programs');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild><Link to="/admin/programs"><ArrowLeft className="size-5" /></Link></Button>
        <div className="flex-1">
          <h1 className="font-display text-3xl font-bold text-forest">Edit Program</h1>
          <p className="text-muted-foreground mt-1">Update program details and images</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/admin/programs')}><X className="size-4 mr-2" /> Cancel</Button>
          <Button onClick={handleSave}><Save className="size-4 mr-2" /> Save Changes</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="text-sm font-medium text-muted-foreground">Title</label><Input value={title} onChange={e => setTitle(e.target.value)} className="mt-1" /></div>
              <div><label className="text-sm font-medium text-muted-foreground">Slug</label><Input value={slug} onChange={e => setSlug(e.target.value)} className="mt-1" /></div>
              <div><label className="text-sm font-medium text-muted-foreground">Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="mt-1 h-10 w-full px-3 rounded-lg border border-border bg-white text-sm">
                  <option value="current">Current</option><option value="development">In Development</option><option value="future">Future</option>
                </select>
              </div>
              <div><label className="text-sm font-medium text-muted-foreground">Status</label>
                <select value={status} onChange={e => setStatus(e.target.value)} className="mt-1 h-10 w-full px-3 rounded-lg border border-border bg-white text-sm">
                  <option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option>
                </select>
              </div>
              <div><label className="text-sm font-medium text-muted-foreground">Display Order</label><Input type="number" value={order} onChange={e => setOrder(Number(e.target.value))} className="mt-1" /></div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Image */}
        <Card>
          <CardContent className="p-6">
            <ImageUpload
              label="Featured Image"
              value={featuredImage.preview || undefined}
              onChange={(file, preview) => setFeaturedImage({ file, preview })}
              hint="Main image shown on program cards"
              aspect="video"
              allowCrop={false}
            />
          </CardContent>
        </Card>
      </div>

      {/* Gallery Images */}
      <Card>
        <CardContent className="p-6">
          <ImageGallery
            images={galleryImages}
            onAdd={handleAddGalleryImage}
            onRemove={handleRemoveGalleryImage}
            maxImages={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminProgramEditPage;
