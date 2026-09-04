import { useParams, Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Reply, Trash2, Archive } from 'lucide-react';

const mockMessages: Record<string, { name: string; email: string; subject: string; message: string; status: string; createdAt: string }> = {
  '1': { name: 'John Doe', email: 'john@example.com', subject: 'Partnership Inquiry', message: 'We are interested in partnering with your organization to expand healthcare access in rural areas. Our company specializes in medical equipment and we would love to discuss potential collaboration opportunities.', status: 'new', createdAt: '2024-01-15' },
  '2': { name: 'Mary Smith', email: 'mary@example.com', subject: 'Volunteer Question', message: 'I would like to know more about volunteering opportunities at Beit-Refuah. I am a registered nurse with 5 years of experience and I am passionate about community health.', status: 'read', createdAt: '2024-01-14' },
  '3': { name: 'Peter Ochieng', email: 'peter@health.go.ke', subject: 'Government Collaboration', message: 'The Ministry of Health would like to discuss a potential collaboration on maternal health programs in Western Kenya. We have seen the excellent work your organization is doing and believe we can achieve more together.', status: 'replied', createdAt: '2024-01-10' },
};

export function AdminContactMessageDetailPage() {
  const { id } = useParams<{ id: string }>();
  useSEO({ title: 'Message Detail | Admin', description: 'View contact message', url: `/admin/contact-messages/${id}`, noIndex: true, noFollow: true });

  const message = mockMessages[id || ''] || mockMessages['1'];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/admin/contact-messages"><ArrowLeft className="size-5" /></Link>
        </Button>
        <div>
          <h1 className="font-display text-3xl font-bold text-forest">{message.subject}</h1>
          <p className="text-muted-foreground mt-1">Contact message from {message.name}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-6 space-y-6">
            <h2 className="font-display text-xl font-semibold text-forest">Message Content</h2>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-forest whitespace-pre-wrap">{message.message}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="font-display text-xl font-semibold text-forest">Actions</h2>
            <div className="space-y-2">
              <Button className="w-full" onClick={() => window.location.href = `mailto:${message.email}?subject=Re: ${message.subject}`}>
                <Reply className="size-4 mr-2" /> Reply via Email
              </Button>
              <Button className="w-full" variant="outline" onClick={() => alert('Message archived')}>
                <Archive className="size-4 mr-2" /> Archive
              </Button>
              <Button className="w-full" variant="destructive" onClick={() => alert('Message deleted')}>
                <Trash2 className="size-4 mr-2" /> Delete
              </Button>
            </div>
            <hr className="border-border" />
            <div className="space-y-2 text-sm">
              <div><span className="font-medium text-muted-foreground">From:</span> <span className="text-forest">{message.name}</span></div>
              <div><span className="font-medium text-muted-foreground">Email:</span> <span className="text-forest">{message.email}</span></div>
              <div><span className="font-medium text-muted-foreground">Date:</span> <span className="text-forest">{new Date(message.createdAt).toLocaleDateString()}</span></div>
              <div><span className="font-medium text-muted-foreground">Status:</span> <span className="text-forest capitalize">{message.status}</span></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminContactMessageDetailPage;
