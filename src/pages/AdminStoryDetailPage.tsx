import { useParams, Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Edit, ExternalLink, Star, Trash2 } from 'lucide-react';
import { cn } from '@/utils/cn';

const mockStories: Record<string, { title: string; excerpt: string; category: string; tags: string[]; isFeatured: boolean; status: string; publishedAt?: string; createdAt: string; author: string }> = {
  '1': { title: "Hope Restored: Mary's Journey", excerpt: "A powerful story of healing and faith...", category: 'Patient Stories', tags: ['healing', 'faith', 'testimony'], isFeatured: true, status: 'published', publishedAt: '2024-01-10', createdAt: '2024-01-08', author: 'Sarah M.' },
  '2': { title: 'Building a Healthier Community', excerpt: 'How our mobile clinic reaches remote villages...', category: 'Program Updates', tags: ['mobile-clinic', 'community', 'outreach'], isFeatured: false, status: 'published', publishedAt: '2024-01-05', createdAt: '2024-01-03', author: 'John K.' },
  '3': { title: 'New Maternity Wing Opens', excerpt: 'Celebrating the opening of our expanded maternal care facilities...', category: 'News', tags: ['maternity', 'facilities', 'celebration'], isFeatured: true, status: 'published', publishedAt: '2024-01-01', createdAt: '2023-12-28', author: 'Admin User' },
};

const statusColors: Record<string, string> = {
  published: 'bg-green-100 text-green-700',
  draft: 'bg-gray-100 text-gray-700',
  archived: 'bg-red-100 text-red-700',
};

export function AdminStoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  useSEO({ title: 'Story Detail | Admin', description: 'View story details', url: `/admin/stories/${id}`, noIndex: true, noFollow: true });

  const story = mockStories[id || ''] || mockStories['1'];
  const slug = Object.keys(mockStories).find(k => mockStories[k].title === story.title) || 'hope-restored-marys-journey';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/admin/stories"><ArrowLeft className="size-5" /></Link>
        </Button>
        <div className="flex-1">
          <h1 className="font-display text-3xl font-bold text-forest">{story.title}</h1>
          <p className="text-muted-foreground mt-1">Story details</p>
        </div>
        <Button variant="outline" asChild>
          <Link to={`/stories/${slug}`} target="_blank"><ExternalLink className="size-4 mr-2" /> View Public</Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-6 space-y-6">
            <h2 className="font-display text-xl font-semibold text-forest">Story Content</h2>
            <p className="text-forest">{story.excerpt}</p>
            <div className="flex flex-wrap gap-2">
              {story.tags.map(tag => (
                <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-forest/10 text-forest">{tag}</span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="font-display text-xl font-semibold text-forest">Details</h2>
            <div className="space-y-2 text-sm">
              <div><span className="font-medium text-muted-foreground">Category:</span> <span className="text-forest">{story.category}</span></div>
              <div><span className="font-medium text-muted-foreground">Author:</span> <span className="text-forest">{story.author}</span></div>
              <div><span className="font-medium text-muted-foreground">Status:</span> <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-1', statusColors[story.status])}>{story.status.charAt(0).toUpperCase() + story.status.slice(1)}</span></div>
              <div><span className="font-medium text-muted-foreground">Created:</span> <span className="text-forest">{new Date(story.createdAt).toLocaleDateString()}</span></div>
              {story.publishedAt && <div><span className="font-medium text-muted-foreground">Published:</span> <span className="text-forest">{new Date(story.publishedAt).toLocaleDateString()}</span></div>}
              {story.isFeatured && <div className="flex items-center gap-1 text-gold"><Star className="size-4 fill-current" /> Featured Story</div>}
            </div>
            <hr className="border-border" />
            <div className="space-y-2">
              <Button className="w-full" asChild>
                <Link to={`/admin/stories/${id}/edit`}><Edit className="size-4 mr-2" /> Edit Story</Link>
              </Button>
              <Button className="w-full" variant="destructive" onClick={() => alert('Story deleted')}>
                <Trash2 className="size-4 mr-2" /> Delete Story
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminStoryDetailPage;
