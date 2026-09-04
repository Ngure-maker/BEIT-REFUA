import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { ArrowLeft, Save, X } from 'lucide-react';

const mockPartnerships: Record<string, { orgName: string; contactName: string; email: string; phone: string; type: string; interests: string[]; status: string }> = {
  '1': { orgName: 'Kenya Ministry of Health', contactName: 'Dr. Peter Ochieng', email: 'peter@health.go.ke', phone: '+254 700 111 111', type: 'government', interests: ['Healthcare Policy', 'Funding', 'Infrastructure'], status: 'partnered' },
  '2': { orgName: 'World Vision Kenya', contactName: 'Mary Wanjiku', email: 'mary@worldvision.org', phone: '+254 700 222 222', type: 'ngo', interests: ['Child Health', 'Community Programs', 'Capacity Building'], status: 'in-discussion' },
  '3': { orgName: 'Local Church Network', contactName: 'Pastor David', email: 'david@church.org', phone: '+254 700 444 444', type: 'faith-based', interests: ['Spiritual Care', 'Volunteer Mobilization', 'Community Outreach'], status: 'partnered' },
};

export function AdminPartnershipEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  useSEO({ title: 'Edit Partnership | Admin', description: 'Edit partnership details', url: `/admin/partnerships/${id}/edit`, noIndex: true, noFollow: true });

  const data = mockPartnerships[id || ''] || mockPartnerships['1'];
  const [orgName, setOrgName] = useState(data.orgName);
  const [contactName, setContactName] = useState(data.contactName);
  const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phone);
  const [type, setType] = useState(data.type);
  const [interests, setInterests] = useState(data.interests.join(', '));
  const [status, setStatus] = useState(data.status);
  const [logo, setLogo] = useState<{ file: File | null; preview: string | null }>({ file: null, preview: null });

  const handleSave = () => {
    alert('Partnership updated successfully!');
    navigate('/admin/partnerships');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild><Link to="/admin/partnerships"><ArrowLeft className="size-5" /></Link></Button>
        <div className="flex-1">
          <h1 className="font-display text-3xl font-bold text-forest">Edit Partnership</h1>
          <p className="text-muted-foreground mt-1">Update partnership details</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/admin/partnerships')}><X className="size-4 mr-2" /> Cancel</Button>
          <Button onClick={handleSave}><Save className="size-4 mr-2" /> Save Changes</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <ImageUpload
              label="Organization Logo"
              value={logo.preview || undefined}
              onChange={(file, preview) => setLogo({ file, preview })}
              hint="Upload partner organization logo"
              aspect="square"
              allowCrop={false}
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardContent className="p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="text-sm font-medium text-muted-foreground">Organization Name</label><Input value={orgName} onChange={e => setOrgName(e.target.value)} className="mt-1" /></div>
              <div><label className="text-sm font-medium text-muted-foreground">Contact Person</label><Input value={contactName} onChange={e => setContactName(e.target.value)} className="mt-1" /></div>
              <div><label className="text-sm font-medium text-muted-foreground">Email</label><Input value={email} onChange={e => setEmail(e.target.value)} className="mt-1" /></div>
              <div><label className="text-sm font-medium text-muted-foreground">Phone</label><Input value={phone} onChange={e => setPhone(e.target.value)} className="mt-1" /></div>
              <div><label className="text-sm font-medium text-muted-foreground">Organization Type</label>
                <select value={type} onChange={e => setType(e.target.value)} className="mt-1 h-10 w-full px-3 rounded-lg border border-border bg-white text-sm">
                  <option value="government">Government</option><option value="ngo">NGO</option><option value="faith-based">Faith-Based</option><option value="corporate">Corporate</option><option value="other">Other</option>
                </select>
              </div>
              <div><label className="text-sm font-medium text-muted-foreground">Status</label>
                <select value={status} onChange={e => setStatus(e.target.value)} className="mt-1 h-10 w-full px-3 rounded-lg border border-border bg-white text-sm">
                  <option value="pending">Pending</option><option value="in-discussion">In Discussion</option><option value="partnered">Partnered</option><option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div><label className="text-sm font-medium text-muted-foreground">Areas of Interest (comma-separated)</label><Input value={interests} onChange={e => setInterests(e.target.value)} className="mt-1" /></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminPartnershipEditPage;
