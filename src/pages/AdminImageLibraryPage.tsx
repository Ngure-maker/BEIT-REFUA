import { useState, useRef } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Upload, Search, Trash2, Eye, Grid, List, X, Check, ImageIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

interface LibraryImage {
  id: string;
  src: string;
  title: string;
  category: string;
  tags: string[];
  uploadedAt: string;
  size: string;
  usedIn?: string[];
}

const initialImages: LibraryImage[] = [
  { id: '1', src: '/images/gallery/clinic-exterior.jpg', title: 'Community Clinic Exterior', category: 'Facilities', tags: ['clinic', 'building'], uploadedAt: '2024-01-15', size: '2.4 MB', usedIn: ['Programs', 'Gallery'] },
  { id: '2', src: '/images/gallery/consultation-room.jpg', title: 'Consultation Room', category: 'Facilities', tags: ['clinic', 'room'], uploadedAt: '2024-01-14', size: '1.8 MB', usedIn: ['Programs'] },
  { id: '3', src: '/images/gallery/health-education.jpg', title: 'Health Education Session', category: 'Programs', tags: ['education', 'community'], uploadedAt: '2024-01-12', size: '3.1 MB', usedIn: ['Stories', 'Gallery'] },
  { id: '4', src: '/images/gallery/maternal-care.jpg', title: 'Maternal Care Services', category: 'Programs', tags: ['maternity', 'healthcare'], uploadedAt: '2024-01-10', size: '2.7 MB', usedIn: ['Programs'] },
  { id: '5', src: '/images/gallery/community-outreach.jpg', title: 'Mobile Clinic Outreach', category: 'Community', tags: ['mobile-clinic', 'outreach'], uploadedAt: '2024-01-08', size: '4.2 MB', usedIn: ['Gallery'] },
  { id: '6', src: '/images/gallery/prayer-meeting.jpg', title: 'Prayer Gathering', category: 'Spiritual Care', tags: ['prayer', 'faith'], uploadedAt: '2024-01-05', size: '1.5 MB', usedIn: ['Stories'] },
];

const categories = ['All', 'Facilities', 'Programs', 'Community', 'Spiritual Care', 'Team', 'Uploaded'];

export function AdminImageLibraryPage() {
  useSEO({ title: 'Image Library | Admin | Beit-Refuah', description: 'Manage all images across the site', url: '/admin/image-library', noIndex: true, noFollow: true });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<LibraryImage[]>(initialImages);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectMode, setSelectMode] = useState(false);
  const [previewImage, setPreviewImage] = useState<LibraryImage | null>(null);

  const filtered = images.filter(img => {
    const matchSearch = img.title.toLowerCase().includes(search.toLowerCase()) || img.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchCat = category === 'All' || img.category === category;
    return matchSearch && matchCat;
  });

  const handleUpload = (files: FileList | null) => {
    if (!files) return;
    const newImages: LibraryImage[] = Array.from(files)
      .filter(f => f.type.startsWith('image/'))
      .map(file => ({
        id: Math.random().toString(36).slice(2),
        src: URL.createObjectURL(file),
        title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        category: 'Uploaded',
        tags: [],
        uploadedAt: new Date().toISOString().split('T')[0],
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      }));
    setImages(prev => [...newImages, ...prev]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleUpload(e.dataTransfer.files);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const deleteSelected = () => {
    if (window.confirm(`Delete ${selectedIds.length} image(s)?`)) {
      setImages(prev => prev.filter(i => !selectedIds.includes(i.id)));
      setSelectedIds([]);
      setSelectMode(false);
    }
  };

  const deleteImage = (id: string) => {
    if (window.confirm('Delete this image?')) {
      setImages(prev => prev.filter(i => i.id !== id));
      setPreviewImage(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-forest">Image Library</h1>
          <p className="text-muted-foreground mt-1">Upload, manage, and assign images across your site</p>
        </div>
        <div className="flex gap-2">
          {selectMode ? (
            <>
              <Button variant="outline" onClick={() => { setSelectMode(false); setSelectedIds([]); }}>Cancel</Button>
              <Button variant="destructive" onClick={deleteSelected} disabled={selectedIds.length === 0}>
                <Trash2 className="size-4 mr-2" /> Delete ({selectedIds.length})
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setSelectMode(true)}><Trash2 className="size-4 mr-2" /> Select to Delete</Button>
              <Button onClick={() => fileInputRef.current?.click()}><Upload className="size-4 mr-2" /> Upload Images</Button>
              <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={e => handleUpload(e.target.files)} className="hidden" />
            </>
          )}
        </div>
      </div>

      {/* Upload Drop Zone */}
      <div
        onDragOver={e => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-gold hover:bg-muted/20 transition-all"
      >
        <Upload className="size-10 mx-auto text-muted-foreground mb-2" />
        <p className="font-medium text-forest">Drag & drop images here or click to browse</p>
        <p className="text-sm text-muted-foreground mt-1">Supports JPG, PNG, WebP — images will appear in the library below</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input placeholder="Search images..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button key={cat} onClick={() => setCategory(cat)} className={cn('px-3 py-1.5 rounded-full text-sm font-medium transition-all', category === cat ? 'bg-forest-deep text-forest-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80')}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Button variant="outline" size="icon" onClick={() => setView('grid')} className={view === 'grid' ? 'bg-forest-deep text-forest-foreground' : ''} aria-label="Grid view">
                <Grid className="size-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => setView('list')} className={view === 'list' ? 'bg-forest-deep text-forest-foreground' : ''} aria-label="List view">
                <List className="size-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image Grid / List */}
      {view === 'grid' ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map(img => (
            <Card key={img.id} className={cn('overflow-hidden group cursor-pointer', selectMode && selectedIds.includes(img.id) && 'ring-2 ring-gold')} onClick={() => selectMode ? toggleSelect(img.id) : setPreviewImage(img)}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={img.src} alt={img.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                {selectMode && (
                  <div className={cn('absolute top-2 right-2 h-6 w-6 rounded-full flex items-center justify-center transition-colors', selectedIds.includes(img.id) ? 'bg-gold text-gold-foreground' : 'bg-white/80 text-muted-foreground')}>
                    <Check className="size-4" />
                  </div>
                )}
                {!selectMode && (
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button onClick={(e) => { e.stopPropagation(); setPreviewImage(img); }} className="h-8 w-8 rounded-full bg-white/90 text-forest flex items-center justify-center hover:bg-white"><Eye className="size-4" /></button>
                    <button onClick={(e) => { e.stopPropagation(); deleteImage(img.id); }} className="h-8 w-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600"><Trash2 className="size-4" /></button>
                  </div>
                )}
                <div className="absolute bottom-2 left-2">
                  <span className="px-2 py-1 rounded text-xs font-medium bg-forest-deep/90 text-forest-foreground">{img.category}</span>
                </div>
              </div>
              <CardContent className="p-3">
                <p className="font-medium text-forest truncate text-sm">{img.title}</p>
                <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
                  <span>{new Date(img.uploadedAt).toLocaleDateString()}</span>
                  <span>{img.size}</span>
                </div>
                {img.usedIn && img.usedIn.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {img.usedIn.map(use => (
                      <span key={use} className="px-1.5 py-0.5 rounded text-[10px] bg-gold/10 text-gold font-medium">{use}</span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-20">
              <ImageIcon className="size-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No images found</p>
            </div>
          )}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    {selectMode && <th className="w-12 p-4"><input type="checkbox" checked={selectedIds.length === filtered.length && filtered.length > 0} onChange={() => setSelectedIds(selectedIds.length === filtered.length ? [] : filtered.map(i => i.id))} className="h-4 w-4 rounded border-border text-gold" /></th>}
                    <th className="p-4 text-left font-medium text-muted-foreground">Image</th>
                    <th className="p-4 text-left font-medium text-muted-foreground">Title</th>
                    <th className="p-4 text-left font-medium text-muted-foreground">Category</th>
                    <th className="p-4 text-left font-medium text-muted-foreground">Tags</th>
                    <th className="p-4 text-left font-medium text-muted-foreground">Date</th>
                    <th className="p-4 text-left font-medium text-muted-foreground">Size</th>
                    <th className="w-32 p-4 text-right font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(img => (
                    <tr key={img.id} className={cn('border-b border-border hover:bg-muted/50 cursor-pointer', selectMode && selectedIds.includes(img.id) && 'bg-gold/5')} onClick={() => selectMode ? toggleSelect(img.id) : setPreviewImage(img)}>
                      {selectMode && <td className="p-4"><input type="checkbox" checked={selectedIds.includes(img.id)} onChange={() => toggleSelect(img.id)} className="h-4 w-4 rounded border-border text-gold" /></td>}
                      <td className="p-4"><img src={img.src} alt={img.title} className="h-12 w-16 rounded object-cover" /></td>
                      <td className="p-4 font-medium text-forest">{img.title}</td>
                      <td className="p-4"><span className="px-2 py-1 rounded text-xs font-medium bg-forest-deep/10 text-forest">{img.category}</span></td>
                      <td className="p-4"><div className="flex flex-wrap gap-1">{img.tags.slice(0, 2).map(t => <span key={t} className="px-1.5 py-0.5 rounded text-[10px] bg-muted text-muted-foreground">{t}</span>)}</div></td>
                      <td className="p-4 text-sm text-muted-foreground">{new Date(img.uploadedAt).toLocaleDateString()}</td>
                      <td className="p-4 text-sm text-muted-foreground">{img.size}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); setPreviewImage(img); }}><Eye className="size-4" /></Button>
                          <Button variant="ghost" size="icon" className="text-red-600" onClick={(e) => { e.stopPropagation(); deleteImage(img.id); }}><Trash2 className="size-4" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setPreviewImage(null)}>
          <div className="bg-white rounded-xl max-w-2xl w-full mx-4 overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="relative aspect-video">
              <img src={previewImage.src} alt={previewImage.title} className="h-full w-full object-cover" />
              <button onClick={() => setPreviewImage(null)} className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"><X className="size-4" /></button>
            </div>
            <div className="p-4">
              <h3 className="font-display text-lg font-semibold text-forest">{previewImage.title}</h3>
              <div className="flex flex-wrap gap-2 mt-2 text-sm text-muted-foreground">
                <span>{previewImage.category}</span>
                <span>•</span>
                <span>{new Date(previewImage.uploadedAt).toLocaleDateString()}</span>
                <span>•</span>
                <span>{previewImage.size}</span>
              </div>
              {previewImage.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {previewImage.tags.map(t => <span key={t} className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">{t}</span>)}
                </div>
              )}
              {previewImage.usedIn && previewImage.usedIn.length > 0 && (
                <div className="mt-3">
                  <span className="text-xs font-medium text-muted-foreground">Used in: </span>
                  {previewImage.usedIn.map(use => <span key={use} className="text-xs text-gold font-medium">{use} </span>)}
                </div>
              )}
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={() => setPreviewImage(null)}>Close</Button>
                <Button variant="destructive" size="sm" onClick={() => deleteImage(previewImage.id)}><Trash2 className="size-3 mr-1" /> Delete</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminImageLibraryPage;
