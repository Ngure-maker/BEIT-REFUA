import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { ArrowLeft, Save, X } from 'lucide-react';

const mockVolunteers: Record<string, { name: string; email: string; phone: string; profession: string; skills: string[]; availability: string; status: string }> = {
  '1': { name: 'Dr. Sarah Johnson', email: 'sarah@email.com', phone: '+254 700 111 111', profession: 'Physician', skills: ['General Medicine', 'Pediatrics'], availability: 'Weekends', status: 'pending' },
  '2': { name: 'James Mwangi', email: 'james@email.com', phone: '+254 700 222 222', profession: 'Nurse', skills: ['Emergency Care', 'Wound Care'], availability: 'Weekdays', status: 'approved' },
  '3': { name: 'Grace Akinyi', email: 'grace@email.com', phone: '+254 700 333 333', profession: 'Community Health Worker', skills: ['Health Education', 'First Aid', 'Counseling'], availability: 'Flexible', status: 'pending' },
};

export function AdminVolunteerEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  useSEO({ title: 'Edit Volunteer | Admin', description: 'Edit volunteer application', url: `/admin/volunteers/${id}/edit`, noIndex: true, noFollow: true });

  const data = mockVolunteers[id || ''] || mockVolunteers['1'];
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phone);
  const [profession, setProfession] = useState(data.profession);
  const [availability, setAvailability] = useState(data.availability);
  const [skills, setSkills] = useState(data.skills.join(', '));
  const [status, setStatus] = useState(data.status);
  const [photo, setPhoto] = useState<{ file: File | null; preview: string | null }>({ file: null, preview: null });

  const handleSave = () => {
    alert('Volunteer updated successfully!');
    navigate('/admin/volunteers');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild><Link to="/admin/volunteers"><ArrowLeft className="size-5" /></Link></Button>
        <div className="flex-1">
          <h1 className="font-display text-3xl font-bold text-forest">Edit Volunteer</h1>
          <p className="text-muted-foreground mt-1">Update volunteer application details</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/admin/volunteers')}><X className="size-4 mr-2" /> Cancel</Button>
          <Button onClick={handleSave}><Save className="size-4 mr-2" /> Save Changes</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <ImageUpload
              label="Profile Photo"
              value={photo.preview || undefined}
              onChange={(file, preview) => setPhoto({ file, preview })}
              hint="Upload a photo of the volunteer"
              aspect="square"
              allowCrop={false}
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardContent className="p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="text-sm font-medium text-muted-foreground">Full Name</label><Input value={name} onChange={e => setName(e.target.value)} className="mt-1" /></div>
              <div><label className="text-sm font-medium text-muted-foreground">Email</label><Input value={email} onChange={e => setEmail(e.target.value)} className="mt-1" /></div>
              <div><label className="text-sm font-medium text-muted-foreground">Phone</label><Input value={phone} onChange={e => setPhone(e.target.value)} className="mt-1" /></div>
              <div><label className="text-sm font-medium text-muted-foreground">Profession</label><Input value={profession} onChange={e => setProfession(e.target.value)} className="mt-1" /></div>
              <div><label className="text-sm font-medium text-muted-foreground">Availability</label><Input value={availability} onChange={e => setAvailability(e.target.value)} className="mt-1" /></div>
              <div><label className="text-sm font-medium text-muted-foreground">Status</label>
                <select value={status} onChange={e => setStatus(e.target.value)} className="mt-1 h-10 w-full px-3 rounded-lg border border-border bg-white text-sm">
                  <option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
            <div><label className="text-sm font-medium text-muted-foreground">Skills (comma-separated)</label><Input value={skills} onChange={e => setSkills(e.target.value)} className="mt-1" /></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminVolunteerEditPage;
