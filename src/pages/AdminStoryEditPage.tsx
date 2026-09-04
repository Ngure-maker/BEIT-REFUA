import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { ArrowLeft, Save, X } from 'lucide-react';

const mockStories: Record<string, { title: string; excerpt: string; category: string; tags: string[]; isFeatured: boolean; status: string; author: string }> = {
  '1': { title: "Hope Restored: Mary's Journey", excerpt: "A powerful story of healing and faith that touched the lives of many in our community...", category: 'Patient Stories', tags: ['healing', 'faith', 'testimony'], isFeatured: true, status: 'published', author: 'Sarah M.' },
  '2': { title: 'Building a Healthier Community', excerpt: 'How our mobile clinic reaches remote villages and transforms lives...', category: 'Program Updates', tags: ['mobile-clinic', 'community', 'outreach'], isFeatured: false, status: 'published', author: 'John K.' },
  '3': { title: 'New Maternity Wing Opens', excerpt: 'Celebrating the opening of our expanded maternal care facilities...', category: 'News', tags: ['maternity', 'facilities', 'celebration'], isFeatured: true, status: 'published', author: 'Admin User' },
};

const categories = ['Patient Stories', 'Program Updates', 'News', 'Volunteer Stories', 'Spiritual Care'];

export function AdminStoryEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  useSEO({ title: 'Edit Story | Admin', description: 'Edit story details', url: `/admin/stories/${id}/edit`, noIndex: true, noFollow: true });

  const data = mockStories[id || ''] || mockStories['1'];
  const [title, setTitle] = useState(data.title);
  const [excerpt, setExcerpt] = useState(data.excerpt);
  const [category, setCategory] = useState(data.category);
  const [tags, setTags] = useState(data.tags.join(', '));
  const [isFeatured, setIsFeatured] = useState(data.isFeatured);
  const [status, setStatus] = useState(data.status);
  const [author, setAuthor] = useState(data.author);
  const [coverImage, setCoverImage] = useState<{ file: File | null; preview: string | null }>({ file: null, preview: null });
  const [authorPhoto, setAuthorPhoto] = useState<{ file: File | null; preview: string | null }>({ file: null, preview: null });

  const handleSave = () => {
    alert('Story updated successfully!');
    navigate('/admin/stories');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild><Link to="/admin/stories"><ArrowLeft className="size-5" /></Link></Button>
        <div className="flex-1">
          <h1 className="font-display text-3xl font-bold text-forest">Edit Story</h1>
          <p className="text-muted-foreground mt-1">Update story content and images</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/admin/stories')}><X className="size-4 mr-2" /> Cancel</Button>
          <Button onClick={handleSave}><Save className="size-4 mr-2" /> Save Changes</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6 space-y-4">
            <div><label className="text-sm font-medium text-muted-foreground">Title</label><Input value={title} onChange={e => setTitle(e.target.value)} className="mt-1" /></div>
            <div><label className="text-sm font-medium text-muted-foreground">Excerpt / Summary</label>
              <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={4} className="mt-1 w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Cover Image */}
          <Card>
            <CardContent className="p-6">
              <ImageUpload
                label="Cover Image"
                value={coverImage.preview || undefined}
                onChange={(file, preview) => setCoverImage({ file, preview })}
                hint="Hero image for the story"
                aspect="video"
                allowCrop={false}
              />
            </CardContent>
          </Card>

          {/* Author Photo */}
          <Card>
            <CardContent className="p-6">
              <ImageUpload
                label="Author Photo"
                value={authorPhoto.preview || undefined}
                onChange={(file, preview) => setAuthorPhoto({ file, preview })}
                hint="Profile photo of the author"
                aspect="square"
                allowCrop={false}
              />
            </CardContent>
          </Card>

          {/* Details */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div><label className="text-sm font-medium text-muted-foreground">Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="mt-1 h-10 w-full px-3 rounded-lg border border-border bg-white text-sm">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div><label className="text-sm font-medium text-muted-foreground">Author</label><Input value={author} onChange={e => setAuthor(e.target.value)} className="mt-1" /></div>
              <div><label className="text-sm font-medium text-muted-foreground">Tags (comma-separated)</label><Input value={tags} onChange={e => setTags(e.target.value)} className="mt-1" /></div>
              <div><label className="text-sm font-medium text-muted-foreground">Status</label>
                <select value={status} onChange={e => setStatus(e.target.value)} className="mt-1 h-10 w-full px-3 rounded-lg border border-border bg-white text-sm">
                  <option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} className="h-4 w-4 rounded border-border text-gold" />
                <label className="text-sm font-medium text-muted-foreground">Featured Story</label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AdminStoryEditPage;
