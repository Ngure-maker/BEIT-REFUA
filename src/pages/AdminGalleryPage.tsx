import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Trash2, Eye, EyeOff, X, Upload } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useSEO } from '@/hooks/useSEO';
import { useSiteContent } from '@/data/SiteContentContext';
import { cn } from '@/utils/cn';

const categories = ['All', 'Facilities', 'Programs', 'Community', 'Spiritual Care', 'Team'];

export function AdminGalleryPage() {
  useSEO({
    title: 'Gallery | Admin | Beit-Refuah',
    description: 'Manage gallery images for Beit-Refuah',
    url: '/admin/gallery',
    noIndex: true,
    noFollow: true,
  });

  const { content, addGalleryImage, updateGalleryImage, deleteGalleryImage } = useSiteContent();
  const gallery = content.gallery || [];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [visibilityFilter, setVisibilityFilter] = useState<'all' | 'visible' | 'hidden'>('all');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const filteredImages = gallery.filter((img) => {
    const matchesSearch = img.title.toLowerCase().includes(search.toLowerCase()) ||
      img.alt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || img.category === categoryFilter;
    const matchesVisibility = visibilityFilter === 'all' ||
      (visibilityFilter === 'visible' && img.visible !== false) ||
      (visibilityFilter === 'hidden' && img.visible === false);
    return matchesSearch && matchesCategory && matchesVisibility;
  });

  const toggleSelect = (id: string) => {
    setSelectedImages(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleVisibility = (id: string) => {
    const img = gallery.find(i => i.id === id);
    if (img) {
      updateGalleryImage(id, { visible: img.visible === false ? true : false });
    }
  };

  const handleAddImages = async (files: FileList | null) => {
    if (!files) return;
    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) continue;
      const name = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      await addGalleryImage(file, {
        alt: name,
        category: 'Facilities',
        title: name,
        description: '',
      });
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (id: string) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      deleteGalleryImage(id);
      setSelectedImages(prev => prev.filter(i => i !== id));
    }
  };

  const visibleCount = gallery.filter(img => img.visible !== false).length;
  const hiddenCount = gallery.length - visibleCount;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-forest">Gallery</h1>
          <p className="text-muted-foreground mt-1">
            {gallery.length} total · {visibleCount} visible to visitors · {hiddenCount} hidden
          </p>
        </div>
        <Button onClick={() => fileInputRef.current?.click()}>
          <Plus className="size-4 mr-2" />
          Add Images
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={e => handleAddImages(e.target.files)}
          className="hidden"
        />
      </div>

      {/* Filters & Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input placeholder="Search images..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-sm font-medium transition-all',
                    categoryFilter === cat
                      ? 'bg-forest-deep text-forest-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {(['all', 'visible', 'hidden'] as const).map(v => (
                <button
                  key={v}
                  onClick={() => setVisibilityFilter(v)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-sm font-medium transition-all capitalize',
                    visibilityFilter === v
                      ? v === 'visible' ? 'bg-green-600 text-white'
                        : v === 'hidden' ? 'bg-amber-500 text-white'
                        : 'bg-forest-deep text-forest-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  )}
                >
                  {v === 'all' ? 'All' : v === 'visible' ? 'Visible' : 'Hidden'}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gallery Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredImages.map((image) => (
          <Card key={image.id} className={cn("overflow-hidden relative group", image.visible === false && "opacity-60")}>
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <img src={image.src} alt={image.alt} className="h-full w-full object-contain" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button variant="ghost" size="icon" className="bg-white text-forest" asChild>
                  <Link to={`/admin/gallery/${image.id}`}><Eye className="size-4" /></Link>
                </Button>
                <Button variant="ghost" size="icon" className="bg-white text-forest" onClick={() => removeImage(image.id)}>
                  <Trash2 className="size-4" />
                </Button>
              </div>
              <div className="absolute top-2 right-2 flex items-center gap-2">
                <button
                  onClick={() => toggleVisibility(image.id)}
                  className={cn(
                    "h-7 w-7 rounded-full flex items-center justify-center transition-colors",
                    image.visible === false
                      ? "bg-amber-500 text-white hover:bg-amber-600"
                      : "bg-green-600 text-white hover:bg-green-700"
                  )}
                  title={image.visible === false ? "Hidden - click to show" : "Visible - click to hide"}
                >
                  {image.visible === false ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                </button>
                <input
                  type="checkbox"
                  checked={selectedImages.includes(image.id)}
                  onChange={() => toggleSelect(image.id)}
                  className="h-4 w-4 rounded border-border text-gold focus:ring-gold"
                />
              </div>
              <div className="absolute bottom-2 left-2 flex items-center gap-2">
                <span className="px-2 py-1 rounded text-xs font-medium bg-forest-deep/90 text-forest-foreground">
                  {image.category}
                </span>
                {image.visible === false && (
                  <span className="px-2 py-1 rounded text-xs font-medium bg-amber-500/90 text-white">
                    Hidden
                  </span>
                )}
              </div>
            </div>
            <CardContent className="p-3">
              <p className="font-medium text-forest truncate">{image.title}</p>
              <p className="text-xs text-muted-foreground mt-1 truncate">{image.alt}</p>
            </CardContent>
          </Card>
        ))}
        {filteredImages.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
            <Upload className="size-16 text-muted-foreground mb-4" />
            <h3 className="font-display text-2xl text-forest mb-2">
              {gallery.length === 0 ? 'No images yet' : 'No images found'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {gallery.length === 0 ? 'Click "Add Images" to get started' : 'Try adjusting your search or filters'}
            </p>
            {gallery.length === 0 && (
              <Button onClick={() => fileInputRef.current?.click()}>
                <Plus className="size-4 mr-2" /> Add Images
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Bulk actions */}
      {selectedImages.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-forest-deep text-forest-foreground px-6 py-3 rounded-lg shadow-lg flex items-center gap-4 z-50">
          <span>{selectedImages.length} selected</span>
          <Button variant="secondary" size="sm" onClick={() => setSelectedImages([])}>
            <X className="size-4 mr-1" /> Clear
          </Button>
          <Button variant="destructive" size="sm" onClick={() => {
            if (window.confirm(`Delete ${selectedImages.length} image(s)?`)) {
              selectedImages.forEach(id => deleteGalleryImage(id));
              setSelectedImages([]);
            }
          }}>
            <Trash2 className="size-4 mr-1" /> Delete
          </Button>
        </div>
      )}
    </div>
  );
}

export default AdminGalleryPage;
