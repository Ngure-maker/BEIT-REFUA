import { useParams, Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

const mockVolunteers: Record<string, { name: string; email: string; phone: string; profession: string; skills: string[]; availability: string; status: string; createdAt: string }> = {
  '1': { name: 'Dr. Sarah Johnson', email: 'sarah@email.com', phone: '+254 700 111 111', profession: 'Physician', skills: ['General Medicine', 'Pediatrics'], availability: 'Weekends', status: 'pending', createdAt: '2024-01-15' },
  '2': { name: 'James Mwangi', email: 'james@email.com', phone: '+254 700 222 222', profession: 'Nurse', skills: ['Emergency Care', 'Wound Care'], availability: 'Weekdays', status: 'approved', createdAt: '2024-01-12' },
  '3': { name: 'Grace Akinyi', email: 'grace@email.com', phone: '+254 700 333 333', profession: 'Community Health Worker', skills: ['Health Education', 'First Aid', 'Counseling'], availability: 'Flexible', status: 'pending', createdAt: '2024-01-08' },
};

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

export function AdminVolunteerDetailPage() {
  const { id } = useParams<{ id: string }>();
  useSEO({ title: 'Volunteer Detail | Admin', description: 'View volunteer application', url: `/admin/volunteers/${id}`, noIndex: true, noFollow: true });

  const volunteer = mockVolunteers[id || ''] || mockVolunteers['1'];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/admin/volunteers"><ArrowLeft className="size-5" /></Link>
        </Button>
        <div>
          <h1 className="font-display text-3xl font-bold text-forest">{volunteer.name}</h1>
          <p className="text-muted-foreground mt-1">Volunteer application details</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-6 space-y-6">
            <h2 className="font-display text-xl font-semibold text-forest">Applicant Information</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div><span className="font-medium text-muted-foreground">Full Name:</span> <span className="text-forest">{volunteer.name}</span></div>
              <div><span className="font-medium text-muted-foreground">Email:</span> <span className="text-forest">{volunteer.email}</span></div>
              <div><span className="font-medium text-muted-foreground">Phone:</span> <span className="text-forest">{volunteer.phone}</span></div>
              <div><span className="font-medium text-muted-foreground">Profession:</span> <span className="text-forest">{volunteer.profession}</span></div>
              <div><span className="font-medium text-muted-foreground">Availability:</span> <span className="text-forest">{volunteer.availability}</span></div>
              <div><span className="font-medium text-muted-foreground">Applied:</span> <span className="text-forest">{new Date(volunteer.createdAt).toLocaleDateString()}</span></div>
            </div>
            <div>
              <span className="font-medium text-muted-foreground text-sm">Skills:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {volunteer.skills.map(skill => (
                  <span key={skill} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-forest/10 text-forest">{skill}</span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="font-display text-xl font-semibold text-forest">Actions</h2>
            <div className="space-y-2">
              <Button className="w-full" onClick={() => alert('Volunteer approved!')}>
                <CheckCircle className="size-4 mr-2" /> Approve
              </Button>
              <Button className="w-full" variant="destructive" onClick={() => alert('Volunteer rejected')}>
                <XCircle className="size-4 mr-2" /> Reject
              </Button>
            </div>
            <hr className="border-border" />
            <div>
              <span className="font-medium text-muted-foreground text-sm">Status:</span>
              <p className="mt-1">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[volunteer.status] || 'bg-gray-100 text-gray-700'}`}>
                  {volunteer.status.charAt(0).toUpperCase() + volunteer.status.slice(1)}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminVolunteerDetailPage;
