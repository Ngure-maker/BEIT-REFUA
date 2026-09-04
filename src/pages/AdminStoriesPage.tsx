import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Eye, Edit, Trash2, BookOpen, Star } from 'lucide-react';
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

interface Story {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  isFeatured: boolean;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  createdAt: string;
  author: string;
}

const initialStories: Story[] = [
  { id: '1', title: 'Hope Restored: Mary\'s Journey', slug: 'hope-restored-marys-journey', excerpt: 'A powerful story of healing and faith...', category: 'Patient Stories', tags: ['healing', 'faith', 'testimony'], isFeatured: true, status: 'published', publishedAt: '2024-01-10', createdAt: '2024-01-08', author: 'Sarah M.' },
  { id: '2', title: 'Building a Healthier Community', slug: 'building-healthier-community', excerpt: 'How our mobile clinic reaches remote villages...', category: 'Program Updates', tags: ['mobile-clinic', 'community', 'outreach'], isFeatured: false, status: 'published', publishedAt: '2024-01-05', createdAt: '2024-01-03', author: 'John K.' },
  { id: '3', title: 'New Maternity Wing Opens', slug: 'new-maternity-wing-opens', excerpt: 'Celebrating the opening of our expanded maternal care facilities...', category: 'News', tags: ['maternity', 'facilities', 'celebration'], isFeatured: true, status: 'published', publishedAt: '2024-01-01', createdAt: '2023-12-28', author: 'Admin User' },
  { id: '4', title: 'Volunteer Spotlight: Dr. James', slug: 'volunteer-spotlight-dr-james', excerpt: 'Meet one of our dedicated volunteer physicians...', category: 'Volunteer Stories', tags: ['volunteer', 'doctor', 'spotlight'], isFeatured: false, status: 'draft', createdAt: '2024-01-12', author: 'Sarah M.' },
  { id: '5', title: 'Faith in Healing: A Chaplain\'s Perspective', slug: 'faith-in-healing-chaplains-perspective', excerpt: 'Exploring the spiritual dimension of healthcare...', category: 'Spiritual Care', tags: ['chaplaincy', 'faith', 'spiritual-care'], isFeatured: false, status: 'draft', createdAt: '2024-01-10', author: 'Pastor David' },
];

export function AdminStoriesPage() {
  useSEO({
    title: 'Stories | Admin | Beit-Refuah',
    description: 'Manage stories and blog posts for Beit-Refuah',
    url: '/admin/stories',
    noIndex: true,
    noFollow: true,
  });

  const { items: stories, remove: removeStory, updateStatus: updateStoryStatus } = useListState(initialStories);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredStories = stories
    .filter((s) => {
      const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) || s.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || s.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    });

  const statusColors = {
    published: 'bg-green-100 text-green-700',
    draft: 'bg-gray-100 text-gray-700',
    archived: 'bg-red-100 text-red-700',
  };

  const categories = ['Patient Stories', 'Program Updates', 'News', 'Volunteer Stories', 'Spiritual Care'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-forest">Stories</h1>
          <p className="text-muted-foreground mt-1">Manage blog posts, testimonials, and news articles</p>
        </div>
        <Link to="/admin/stories/new">
          <Button>
            <Plus className="size-4 mr-2" aria-hidden="true" />
            Write Story
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" aria-hidden="true" />
              <Input placeholder="Search stories..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <div className="flex gap-2">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-10 px-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold">
                <option value="all">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="h-10 px-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold">
                <option value="all">All Categories</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
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
                <TableHead className="w-12"></TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="w-32">Featured</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-36">Published</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="w-48">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStories.map((story) => (
                <TableRow key={story.id}>
                  <TableCell>
                    <img src={`/images/stories/${story.slug}.jpg`} alt="" className="h-12 w-16 rounded object-cover" />
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-forest">{story.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{story.excerpt}</p>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-forest/10 text-forest">
                      {story.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {story.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">{tag}</span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {story.isFeatured && <Star className="size-4 text-gold fill-current" aria-label="Featured" />}
                  </TableCell>
                  <TableCell>
                    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', statusColors[story.status])}>
                      {story.status.charAt(0).toUpperCase() + story.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {story.publishedAt ? new Date(story.publishedAt).toLocaleDateString() : '—'}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{story.author}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {story.status === 'draft' && (
                        <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => updateStoryStatus(story.id, 'published')}>
                          Publish
                        </Button>
                      )}
                      {story.status === 'published' && (
                        <Button variant="ghost" size="sm" className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50" onClick={() => updateStoryStatus(story.id, 'draft')}>
                          Unpublish
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/stories/${story.slug}`} target="_blank"><Eye className="size-4" /></Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => removeStory(story.id)}>
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredStories.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-12">
                    <BookOpen className="size-12 mx-auto text-muted-foreground mb-4" aria-hidden="true" />
                    <p className="text-muted-foreground">No stories found</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminStoriesPage;