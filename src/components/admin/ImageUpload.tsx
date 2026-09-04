import { useState, useRef, useEffect } from 'react';
import { Upload, X, Crop } from 'lucide-react';
import { cn } from '@/utils/cn';
import { ImageCropper } from './ImageCropper';

interface ImageUploadProps {
  value?: string;
  onChange: (file: File | null, preview: string | null) => void;
  label?: string;
  className?: string;
  aspect?: 'square' | 'video' | 'wide';
  hint?: string;
  allowCrop?: boolean;
}

export function ImageUpload({ value, onChange, label = 'Image', className, aspect = 'video', hint, allowCrop = true }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(value || null);
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [cropSrc, setCropSrc] = useState<string | null>(null);

  // Sync preview with value prop when it changes externally
  useEffect(() => {
    setPreview(value || null);
  }, [value]);

  const aspectRatio = aspect === 'square' ? 1 : aspect === 'wide' ? 16 / 9 : 4 / 3;

  const handleFile = (file: File | null) => {
    if (!file || !file.type.startsWith('image/')) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      // Show preview immediately
      setPreview(result);
      onChange(file, result);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedDataUrl: string) => {
    setCropSrc(null);
    setPreview(croppedDataUrl);
    onChange(null, croppedDataUrl);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0] || null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0] || null);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    setFileName(null);
    onChange(null, null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-[4/3]',
    wide: 'aspect-[16/9]',
  };

  return (
    <div className={className}>
      {label && <label className="text-sm font-medium text-muted-foreground mb-2 block">{label}</label>}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          'relative rounded-lg border-2 border-dashed cursor-pointer transition-all overflow-hidden',
          dragOver ? 'border-gold bg-gold/5' : 'border-border hover:border-gold/50 hover:bg-muted/30',
          aspectClasses[aspect]
        )}
      >
        {preview ? (
          <>
            <img src={preview} alt={label} className="h-full w-full object-contain" />
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                className="h-10 w-10 rounded-full bg-white text-forest flex items-center justify-center hover:bg-white/90"
                title="Replace image"
              >
                <Upload className="size-4" />
              </button>
              {allowCrop && (
                <button
                  onClick={(e) => { e.stopPropagation(); setCropSrc(preview); }}
                  className="h-10 w-10 rounded-full bg-white text-forest flex items-center justify-center hover:bg-white/90"
                  title="Crop image"
                >
                  <Crop className="size-4" />
                </button>
              )}
              <button
                onClick={handleRemove}
                className="h-10 w-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
                title="Remove image"
              >
                <X className="size-4" />
              </button>
            </div>
            {fileName && (
              <div className="absolute bottom-2 left-2 right-2 bg-forest-deep/90 text-forest-foreground text-xs px-3 py-1.5 rounded-md text-center truncate">
                {fileName}
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <Upload className={cn('size-8 mb-2', dragOver ? 'text-gold' : 'text-muted-foreground')} />
            <p className="text-sm font-medium text-forest">Click or drag to upload</p>
            {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
          </div>
        )}
      </div>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleInputChange} className="hidden" />

      {cropSrc && (
        <ImageCropper
          imageSrc={cropSrc}
          aspect={aspectRatio}
          onCrop={handleCropComplete}
          onCancel={() => setCropSrc(null)}
        />
      )}
    </div>
  );
}

interface ImageGalleryProps {
  images: { id: string; src: string; alt: string }[];
  onAdd: (file: File) => void;
  onRemove: (id: string) => void;
  onReorder?: (fromIndex: number, toIndex: number) => void;
  maxImages?: number;
}

export function ImageGallery({ images, onAdd, onRemove, maxImages = 10 }: ImageGalleryProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).filter(f => f.type.startsWith('image/')).slice(0, maxImages - images.length).forEach(file => onAdd(file));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-muted-foreground">Gallery Images ({images.length}/{maxImages})</label>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {images.map(img => (
          <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden border border-border group">
            <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
            <button
              onClick={() => onRemove(img.id)}
              className="absolute top-2 right-2 h-6 w-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            >
              <X className="size-3" />
            </button>
          </div>
        ))}
        {images.length < maxImages && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center hover:border-gold hover:bg-muted/30 transition-all"
          >
            <Upload className="size-6 text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground">Add Image</span>
          </button>
        )}
      </div>
      <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={e => handleFiles(e.target.files)} className="hidden" />
    </div>
  );
}
