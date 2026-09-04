import { useState, useRef } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { useSiteContent, type SiteContent } from '@/data/SiteContentContext';
import { Save, ChevronDown, ChevronUp, Layout, User, Heart, Briefcase, MessageSquare, BarChart3, Phone, Building, Image } from 'lucide-react';

interface Section {
  id: string;
  label: string;
  icon: typeof Layout;
  fields: Field[];
}

interface Field {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'image' | 'cta' | 'array';
  hint?: string;
  arrayFields?: Field[];
}

const sections: Section[] = [
  {
    id: 'hero',
    label: 'Hero Section',
    icon: Layout,
    fields: [
      { key: 'hero.headline', label: 'Headline', type: 'text', hint: 'Main heading on the homepage' },
      { key: 'hero.subheadline', label: 'Subheadline', type: 'text' },
      { key: 'hero.mission', label: 'Mission Statement', type: 'text' },
      { key: 'hero.image', label: 'Hero Image', type: 'image', hint: 'Main background image' },
      { key: 'hero.imageAlt', label: 'Image Alt Text', type: 'text' },
      { key: 'hero.primaryCta', label: 'Primary Button', type: 'cta' },
      { key: 'hero.secondaryCta', label: 'Secondary Button', type: 'cta' },
    ],
  },
  {
    id: 'mission',
    label: 'Mission Section',
    icon: User,
    fields: [
      { key: 'mission.title', label: 'Title', type: 'text' },
      { key: 'mission.description', label: 'Description', type: 'textarea' },
      { key: 'mission.image', label: 'Image', type: 'image' },
      { key: 'mission.imageAlt', label: 'Image Alt Text', type: 'text' },
      { key: 'mission.cta', label: 'CTA Button', type: 'cta' },
      { key: 'mission.pillars', label: 'Four Pillars', type: 'array', arrayFields: [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'text' },
      ]},
    ],
  },
  {
    id: 'healthcare',
    label: 'Healthcare Preview',
    icon: Heart,
    fields: [
      { key: 'healthcare.title', label: 'Title', type: 'text' },
      { key: 'healthcare.description', label: 'Description', type: 'textarea' },
      { key: 'healthcare.image', label: 'Image', type: 'image' },
      { key: 'healthcare.imageAlt', label: 'Image Alt Text', type: 'text' },
      { key: 'healthcare.cta', label: 'CTA Button', type: 'cta' },
    ],
  },
  {
    id: 'programs',
    label: 'Programs Preview',
    icon: Briefcase,
    fields: [
      { key: 'programs.eyebrow', label: 'Section Eyebrow', type: 'text' },
      { key: 'programs.heading', label: 'Section Heading', type: 'text' },
      { key: 'programs.items', label: 'Program Items', type: 'array', arrayFields: [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'text' },
        { key: 'image', label: 'Image', type: 'image' },
        { key: 'imageAlt', label: 'Image Alt', type: 'text' },
      ]},
    ],
  },
  {
    id: 'impactMetrics',
    label: 'Impact Metrics',
    icon: BarChart3,
    fields: [
      { key: 'impactMetrics.heading', label: 'Heading', type: 'text' },
      { key: 'impactMetrics.description', label: 'Description', type: 'textarea' },
      { key: 'impactMetrics.items', label: 'Metrics', type: 'array', arrayFields: [
        { key: 'label', label: 'Label', type: 'text' },
        { key: 'value', label: 'Value', type: 'text' },
        { key: 'description', label: 'Description', type: 'text' },
      ]},
    ],
  },
  {
    id: 'finalCta',
    label: 'Final CTA',
    icon: MessageSquare,
    fields: [
      { key: 'finalCta.title', label: 'Title', type: 'text' },
      { key: 'finalCta.image', label: 'Image', type: 'image' },
      { key: 'finalCta.imageAlt', label: 'Image Alt Text', type: 'text' },
      { key: 'finalCta.primaryCta', label: 'Primary Button', type: 'cta' },
      { key: 'finalCta.secondaryCta', label: 'Secondary Button', type: 'cta' },
    ],
  },
  {
    id: 'contact',
    label: 'Contact Info',
    icon: Phone,
    fields: [
      { key: 'contact.location', label: 'Location', type: 'text' },
      { key: 'contact.phone', label: 'Phone', type: 'text' },
      { key: 'contact.email', label: 'Email', type: 'text' },
      { key: 'contact.website', label: 'Website', type: 'text' },
      { key: 'contact.hours', label: 'Hours', type: 'text' },
      { key: 'contact.socialLinks', label: 'Social Links', type: 'array', arrayFields: [
        { key: 'name', label: 'Platform', type: 'text' },
        { key: 'url', label: 'URL', type: 'text' },
      ]},
    ],
  },
  {
    id: 'organization',
    label: 'Organization',
    icon: Building,
    fields: [
      { key: 'organization.logo', label: 'Logo', type: 'image', hint: 'Company logo shown in the navigation bar' },
      { key: 'organization.name', label: 'Name', type: 'text' },
      { key: 'organization.tagline', label: 'Tagline', type: 'text' },
      { key: 'organization.description', label: 'Description', type: 'textarea' },
      { key: 'organization.copyright', label: 'Copyright', type: 'text' },
    ],
  },
  {
    id: 'gallery',
    label: 'Gallery Images',
    icon: Image,
    fields: [],
  },
];

function getValue(obj: any, path: string): any {
  return path.split('.').reduce((o, k) => o?.[k], obj);
}

function EditableField({ field, content, updateContent, updateImage }: { field: Field; content: SiteContent; updateContent: (path: string, value: any) => void; updateImage: (path: string, file: File) => Promise<void> }) {
  const value = getValue(content, field.key);

  if (field.type === 'image') {
    return (
      <ImageUpload
        label={field.label}
        value={typeof value === 'string' ? value : undefined}
        onChange={(file, preview) => {
          if (preview) {
            updateContent(field.key, preview);
          }
          if (file) {
            updateImage(field.key, file);
          }
        }}
        hint={field.hint}
        aspect="video"
        allowCrop={false}
      />
    );
  }

  if (field.type === 'cta') {
    const cta = value || { label: '', href: '' };
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">{field.label}</label>
        <div className="grid grid-cols-2 gap-2">
          <Input value={cta.label} onChange={e => updateContent(field.key, { ...cta, label: e.target.value })} placeholder="Button text" />
          <Input value={cta.href} onChange={e => updateContent(field.key, { ...cta, href: e.target.value })} placeholder="/path" />
        </div>
      </div>
    );
  }

  if (field.type === 'textarea') {
    return (
      <div>
        <label className="text-sm font-medium text-muted-foreground">{field.label}</label>
        <textarea
          value={value || ''}
          onChange={e => updateContent(field.key, e.target.value)}
          rows={3}
          className="mt-1 w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold"
        />
        {field.hint && <p className="text-xs text-muted-foreground mt-1">{field.hint}</p>}
      </div>
    );
  }

  return (
    <div>
      <label className="text-sm font-medium text-muted-foreground">{field.label}</label>
      <Input value={value || ''} onChange={e => updateContent(field.key, e.target.value)} className="mt-1" />
      {field.hint && <p className="text-xs text-muted-foreground mt-1">{field.hint}</p>}
    </div>
  );
}

function EditableArray({ field, content, updateContent, updateImage }: { field: Field; content: SiteContent; updateContent: (path: string, value: any) => void; updateImage: (path: string, file: File) => Promise<void> }) {
  const items = getValue(content, field.key) || [];
  void updateImage;

  const addItem = () => {
    const newItem: any = {};
    field.arrayFields?.forEach(f => { newItem[f.key] = ''; });
    updateContent(field.key, [...items, newItem]);
  };

  const removeItem = (index: number) => {
    updateContent(field.key, items.filter((_: any, i: number) => i !== index));
  };

  const updateItem = (index: number, itemField: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [itemField]: value };
    updateContent(field.key, newItems);
  };

  return (
    <div>
      <label className="text-sm font-medium text-muted-foreground block mb-2">{field.label}</label>
      <div className="space-y-3">
        {items.map((item: any, index: number) => (
          <div key={index} className="border border-border rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">#{index + 1}</span>
              <button onClick={() => removeItem(index)} className="text-xs text-red-500 hover:text-red-700">Remove</button>
            </div>
            {field.arrayFields?.map(f => (
              <EditableField
                key={f.key}
                field={{ ...f, key: f.key }}
                content={{ [f.key]: item[f.key] } as any}
                updateContent={(_, val) => updateItem(index, f.key, val)}
                updateImage={(_, file) => updateImage(`${field.key}.${index}.${f.key}`, file)}
              />
            ))}
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={addItem}>+ Add {field.label.replace(/s$/, '')}</Button>
      </div>
    </div>
  );
}

function GalleryEditor({ content, addGalleryImage, updateGalleryImage, deleteGalleryImage }: { content: SiteContent; addGalleryImage: (file: File, meta: { alt: string; category: string; title: string; description: string }) => Promise<void>; updateGalleryImage: (id: string, meta: { alt?: string; category?: string; title?: string; description?: string; visible?: boolean }) => Promise<void>; deleteGalleryImage: (id: string) => Promise<void> }) {
  const gallery = content.gallery || [];
  const categories = ['All', 'Facilities', 'Programs', 'Community', 'Spiritual Care', 'Team'];
  const galleryFileRef = useRef<HTMLInputElement>(null);

  const handleAdd = async (file: File) => {
    const name = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
    await addGalleryImage(file, {
      alt: name,
      category: 'Facilities',
      title: name,
      description: '',
    });
  };

  const removeImage = (id: string) => {
    if (window.confirm('Remove this image from the gallery?')) {
      deleteGalleryImage(id);
    }
  };

  const updateImageField = (id: string, key: string, value: any) => {
    updateGalleryImage(id, { [key]: value });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Manage images shown on the Gallery page. Upload an image and fill in the details.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {gallery.map((img: any) => (
          <div key={img.id} className="border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">{img.title || 'Untitled'}</span>
              <button onClick={() => removeImage(img.id)} className="text-xs text-red-500 hover:text-red-700">Remove</button>
            </div>
            {img.src && (
              <img src={img.src} alt={img.alt} className="w-full h-32 rounded object-contain bg-muted" />
            )}
            <Input
              value={img.title || ''}
              onChange={e => updateImageField(img.id, 'title', e.target.value)}
              placeholder="Title"
            />
            <Input
              value={img.alt || ''}
              onChange={e => updateImageField(img.id, 'alt', e.target.value)}
              placeholder="Alt text"
            />
            <Input
              value={img.description || ''}
              onChange={e => updateImageField(img.id, 'description', e.target.value)}
              placeholder="Description"
            />
            <select
              value={img.category || 'Facilities'}
              onChange={e => updateImageField(img.id, 'category', e.target.value)}
              className="h-10 w-full px-3 rounded-lg border border-border bg-white text-sm"
            >
              {categories.filter(c => c !== 'All').map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        ))}
      </div>
      <div>
        <input
          ref={galleryFileRef}
          type="file"
          multiple
          accept="image/*"
          onChange={e => {
            if (e.target.files) {
              Array.from(e.target.files).forEach(f => handleAdd(f));
              e.target.value = '';
            }
          }}
          className="hidden"
        />
        <Button variant="outline" size="sm" onClick={() => galleryFileRef.current?.click()}>+ Add Gallery Image</Button>
      </div>
    </div>
  );
}

export function AdminPageEditorPage() {
  useSEO({ title: 'Page Editor | Admin | Beit-Refuah', description: 'Edit all website content', url: '/admin/page-editor', noIndex: true, noFollow: true });

  const { content, updateContent, updateImage, addGalleryImage, updateGalleryImage, deleteGalleryImage } = useSiteContent();
  const [openSection, setOpenSection] = useState<string | null>('hero');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all content to defaults? This cannot be undone.')) {
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-forest">Page Editor</h1>
          <p className="text-muted-foreground mt-1">Edit every section of your website — text, images, buttons, and more</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>Reset to Defaults</Button>
          <Button onClick={handleSave}>
            <Save className="size-4 mr-2" />
            {saved ? 'Saved!' : 'Save All Changes'}
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {sections.map(section => (
          <Card key={section.id}>
            <button
              onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
              className="w-full flex items-center gap-3 p-4 text-left hover:bg-muted/30 transition-colors"
            >
              <div className="h-10 w-10 rounded-lg bg-forest/10 flex items-center justify-center shrink-0">
                <section.icon className="size-5 text-forest" />
              </div>
              <span className="font-display text-lg font-semibold text-forest flex-1">{section.label}</span>
              {openSection === section.id ? <ChevronUp className="size-5 text-muted-foreground" /> : <ChevronDown className="size-5 text-muted-foreground" />}
            </button>
            {openSection === section.id && (
              <CardContent className="p-6 pt-0 space-y-4 border-t border-border">
                {section.id === 'gallery' ? (
                  <GalleryEditor
                    content={content}
                    addGalleryImage={addGalleryImage}
                    updateGalleryImage={updateGalleryImage}
                    deleteGalleryImage={deleteGalleryImage}
                  />
                ) : (
                  section.fields.map(field => {
                    if (field.type === 'array' && field.arrayFields) {
                      return <EditableArray key={field.key} field={field} content={content} updateContent={updateContent} updateImage={updateImage} />;
                    }
                    return <EditableField key={field.key} field={field} content={content} updateContent={updateContent} updateImage={updateImage} />;
                  })
                )}
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AdminPageEditorPage;
