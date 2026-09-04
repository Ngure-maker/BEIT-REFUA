import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArrowLeft, Upload, X, Image } from 'lucide-react';
import { useSiteContent } from '@/data/SiteContentContext';

interface PendingImage {
  id: string;
  file: File;
  preview: string;
  title: string;
  category: string;
  alt: string;
}

export function AdminGalleryUploadPage() {
  useSEO({ title: 'Upload Images | Admin | Beit-Refuah', description: 'Upload new images to the gallery', url: '/admin/gallery/upload', noIndex: true, noFollow: true });

  const { addGalleryImage } = useSiteContent();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<PendingImage[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newImages: PendingImage[] = Array.from(files)
      .filter(f => f.type.startsWith('image/'))
      .map(file => ({
        id: Math.random().toString(36).slice(2),
        file,
        preview: URL.createObjectURL(file),
        title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        category: 'Facilities',
        alt: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
      }));
    setImages(prev => [...prev, ...newImages]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const img = prev.find(i => i.id === id);
      if (img) URL.revokeObjectURL(img.preview);
      return prev.filter(i => i.id !== id);
    });
  };

  const updateImage = (id: string, field: 'title' | 'category' | 'alt', value: string) => {
    setImages(prev => prev.map(img => img.id === id ? { ...img, [field]: value } : img));
  };

  const handleUpload = async () => {
    if (images.length === 0) return;
    setUploading(true);

    for (const img of images) {
      await addGalleryImage(img.file, {
        alt: img.alt,
        category: img.category,
        title: img.title,
        description: '',
      });
      URL.revokeObjectURL(img.preview);
    }

    setUploading(false);
    navigate('/admin/gallery');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/admin/gallery"><ArrowLeft className="size-5" /></Link>
        </Button>
        <div className="flex-1">
          <h1 className="font-display text-3xl font-bold text-forest">Upload Images</h1>
          <p className="text-muted-foreground mt-1">Add new images to your gallery</p>
        </div>
        {images.length > 0 && (
          <Button onClick={handleUpload} disabled={uploading}>
            <Upload className="size-4 mr-2" />
            {uploading ? 'Uploading...' : `Upload ${images.length} Image(s)`}
          </Button>
        )}
      </div>

      {/* Drop Zone */}
      <Card>
        <CardContent className="p-6">
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${dragOver ? 'border-gold bg-gold/5' : 'border-border hover:border-gold/50 hover:bg-muted/30'}`}
          >
            <Upload className="size-12 mx-auto text-muted-foreground mb-4" />
            <p className="font-display text-lg text-forest mb-1">Drag & drop images here</p>
            <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
            <p className="text-xs text-muted-foreground">Supports: JPG, PNG, WebP</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={e => handleFiles(e.target.files)}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* Preview List */}
      {images.length > 0 && (
        <div className="space-y-4">
          {images.map(img => (
            <Card key={img.id}>
              <CardContent className="p-4 flex gap-4">
                <div className="relative shrink-0">
                  <img src={img.preview} alt={img.title} className="h-24 w-32 rounded-lg object-contain bg-muted" />
                  <button onClick={() => removeImage(img.id)} className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600">
                    <X className="size-3" />
                  </button>
                </div>
                <div className="flex-1 grid sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-1">
                    <label className="text-xs font-medium text-muted-foreground">Title</label>
                    <Input value={img.title} onChange={e => updateImage(img.id, 'title', e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Category</label>
                    <select value={img.category} onChange={e => updateImage(img.id, 'category', e.target.value)} className="mt-1 h-10 w-full px-3 rounded-lg border border-border bg-white text-sm">
                      <option>Facilities</option>
                      <option>Programs</option>
                      <option>Community</option>
                      <option>Spiritual Care</option>
                      <option>Team</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Alt Text</label>
                    <Input value={img.alt} onChange={e => updateImage(img.id, 'alt', e.target.value)} className="mt-1" placeholder="Describe the image" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div className="text-center py-12">
          <Image className="size-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No images selected. Use the drop zone above to add images.</p>
        </div>
      )}
    </div>
  );
}

export default AdminGalleryUploadPage;
