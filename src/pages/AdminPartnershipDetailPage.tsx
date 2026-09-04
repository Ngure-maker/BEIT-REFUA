import { useParams, Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

const mockPartnerships: Record<string, { orgName: string; contactName: string; email: string; phone: string; type: string; interests: string[]; status: string; createdAt: string }> = {
  '1': { orgName: 'Kenya Ministry of Health', contactName: 'Dr. Peter Ochieng', email: 'peter@health.go.ke', phone: '+254 700 111 111', type: 'government', interests: ['Healthcare Policy', 'Funding', 'Infrastructure'], status: 'partnered', createdAt: '2023-06-01' },
  '2': { orgName: 'World Vision Kenya', contactName: 'Mary Wanjiku', email: 'mary@worldvision.org', phone: '+254 700 222 222', type: 'ngo', interests: ['Child Health', 'Community Programs', 'Capacity Building'], status: 'in-discussion', createdAt: '2024-01-10' },
  '3': { orgName: 'Local Church Network', contactName: 'Pastor David', email: 'david@church.org', phone: '+254 700 444 444', type: 'faith-based', interests: ['Spiritual Care', 'Volunteer Mobilization', 'Community Outreach'], status: 'partnered', createdAt: '2023-09-15' },
};

const statusColors: Record<string, string> = {
  'partnered': 'bg-green-100 text-green-700',
  'in-discussion': 'bg-yellow-100 text-yellow-700',
  'pending': 'bg-blue-100 text-blue-700',
};

export function AdminPartnershipDetailPage() {
  const { id } = useParams<{ id: string }>();
  useSEO({ title: 'Partnership Detail | Admin', description: 'View partnership details', url: `/admin/partnerships/${id}`, noIndex: true, noFollow: true });

  const partnership = mockPartnerships[id || ''] || mockPartnerships['1'];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/admin/partnerships"><ArrowLeft className="size-5" /></Link>
        </Button>
        <div>
          <h1 className="font-display text-3xl font-bold text-forest">{partnership.orgName}</h1>
          <p className="text-muted-foreground mt-1">Partnership details</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-6 space-y-6">
            <h2 className="font-display text-xl font-semibold text-forest">Organization Information</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div><span className="font-medium text-muted-foreground">Organization:</span> <span className="text-forest">{partnership.orgName}</span></div>
              <div><span className="font-medium text-muted-foreground">Contact Person:</span> <span className="text-forest">{partnership.contactName}</span></div>
              <div><span className="font-medium text-muted-foreground">Email:</span> <span className="text-forest">{partnership.email}</span></div>
              <div><span className="font-medium text-muted-foreground">Phone:</span> <span className="text-forest">{partnership.phone}</span></div>
              <div><span className="font-medium text-muted-foreground">Type:</span> <span className="text-forest capitalize">{partnership.type}</span></div>
              <div><span className="font-medium text-muted-foreground">Since:</span> <span className="text-forest">{new Date(partnership.createdAt).toLocaleDateString()}</span></div>
            </div>
            <div>
              <span className="font-medium text-muted-foreground text-sm">Areas of Interest:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {partnership.interests.map(interest => (
                  <span key={interest} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-forest/10 text-forest">{interest}</span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="font-display text-xl font-semibold text-forest">Actions</h2>
            <div className="space-y-2">
              <Button className="w-full" onClick={() => alert('Partnership confirmed!')}>
                <CheckCircle className="size-4 mr-2" /> Confirm Partnership
              </Button>
              <Button className="w-full" variant="destructive" onClick={() => alert('Partnership ended')}>
                <XCircle className="size-4 mr-2" /> End Partnership
              </Button>
            </div>
            <hr className="border-border" />
            <div>
              <span className="font-medium text-muted-foreground text-sm">Status:</span>
              <p className="mt-1">
                <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', statusColors[partnership.status] || 'bg-gray-100 text-gray-700')}>
                  {partnership.status.charAt(0).toUpperCase() + partnership.status.slice(1).replace('-', ' ')}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminPartnershipDetailPage;
