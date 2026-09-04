import { useState } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { useSiteContent } from '@/data/SiteContentContext';
import { Shield, Bell, Globe, Palette, Database, Key, Save, Loader2, MessageSquare, User, Mail, Check } from 'lucide-react';
import { cn } from '@/utils/cn';

export function AdminSettingsPage() {
  useSEO({ title: 'Settings | Admin', description: 'Manage your admin dashboard preferences and site configuration', url: '/admin/settings', noIndex: true, noFollow: true });
  const { content, updateContent, updateImage } = useSiteContent();
  const [activeTab, setActiveTab] = useState<'general' | 'appearance' | 'notifications' | 'security' | 'integrations'>('general');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Database },
  ];

  const handleLogoChange = (file: File | null, preview: string | null) => {
    if (file && preview) {
      updateContent('organization.logo', preview);
      updateImage('organization.logo', file);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-forest">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your admin dashboard preferences and site configuration</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <Card className="lg:w-64 flex-shrink-0">
          <CardContent className="p-4">
            <nav className="space-y-1" aria-label="Settings sections">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors',
                      activeTab === tab.id
                        ? 'bg-forest-deep text-forest-foreground'
                        : 'text-foreground/80 hover:bg-forest/5 hover:text-forest'
                    )}
                  >
                    <Icon className="size-5 flex-shrink-0" aria-hidden="true" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </CardContent>
        </Card>

        {/* Content Panels */}
        <div className="flex-1">
          {activeTab === 'general' && (
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure basic site information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Logo Upload */}
                <div className="space-y-2">
                  <Label>Site Logo</Label>
                  <p className="text-sm text-muted-foreground">This logo appears in the navigation bar across your site</p>
                  <ImageUpload
                    value={content.organization.logo || ''}
                    onChange={handleLogoChange}
                    label=""
                    aspect="square"
                    hint="Square logo recommended"
                    allowCrop={false}
                    className="max-w-[200px]"
                  />
                </div>

                <hr className="border-border" />

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="site-name">Site Name</Label>
                    <Input id="site-name" defaultValue={content.organization.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site-tagline">Tagline</Label>
                    <Input id="site-tagline" defaultValue={content.organization.tagline} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site-url">Site URL</Label>
                    <Input id="site-url" defaultValue="https://beit-refuah.org" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input id="admin-email" type="email" defaultValue="admin@beit-refuah.org" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-description">Site Description</Label>
                  <textarea id="site-description" className="w-full min-h-[100px] rounded-lg border border-border bg-white p-3 text-sm text-forest focus:outline-none focus:ring-2 focus:ring-gold" defaultValue={content.organization.description} />
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={saving}>
                    {saving ? <Loader2 className="size-4 mr-2 animate-spin" /> : saved ? <Check className="size-4 mr-2" /> : <Save className="size-4 mr-2" />} {saved ? 'Saved!' : 'Save Changes'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'appearance' && (
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the look and feel of your site</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Primary Color</Label>
                  <div className="flex gap-4 mt-2">
                    {['forest-deep', 'forest', 'emerald', 'blue', 'purple'].map(color => (
                      <button key={color} className={cn('h-10 w-10 rounded-lg border-2 transition-all', color === 'forest-deep' ? 'border-gold' : 'border-transparent')}>
                        <div className={cn('h-full w-full rounded-md', `bg-${color}`)} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Accent Color</Label>
                  <div className="flex gap-4 mt-2">
                    {['gold', 'amber', 'orange', 'red', 'pink'].map(color => (
                      <button key={color} className={cn('h-10 w-10 rounded-lg border-2 transition-all', color === 'gold' ? 'border-forest-deep' : 'border-transparent')}>
                        <div className={cn('h-full w-full rounded-md', `bg-${color}-500`)} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={saving}>
                    {saving ? <Loader2 className="size-4 mr-2 animate-spin" /> : <Save className="size-4 mr-2" />} Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { id: 'email-new-prayer', label: 'New Prayer Requests', description: 'Receive email when someone submits a prayer request' },
                  { id: 'email-new-volunteer', label: 'New Volunteer Applications', description: 'Receive email when someone applies to volunteer' },
                  { id: 'email-new-partnership', label: 'New Partnership Inquiries', description: 'Receive email when an organization inquires about partnership' },
                  { id: 'email-new-contact', label: 'New Contact Messages', description: 'Receive email when someone sends a contact message' },
                  { id: 'email-donations', label: 'Donation Notifications', description: 'Receive email for completed donations' },
                  { id: 'push-notifications', label: 'Browser Push Notifications', description: 'Enable push notifications in the browser' },
                ].map(item => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div>
                      <Label htmlFor={item.id} className="font-medium">{item.label}</Label>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <input type="checkbox" id={item.id} defaultChecked={!item.id.includes('push')} className="h-5 w-5 rounded border-border text-gold focus:ring-gold" />
                  </div>
                ))}
                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={saving}>
                    {saving ? <Loader2 className="size-4 mr-2 animate-spin" /> : <Save className="size-4 mr-2" />} Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your account security and access settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" placeholder="Enter current password" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" placeholder="Enter new password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={saving} variant="secondary">
                    {saving ? <Loader2 className="size-4 mr-2 animate-spin" /> : <Key className="size-4 mr-2" />} Update Password
                  </Button>
                </div>
                <hr className="border-border" />
                <div>
                  <h4 className="font-medium text-forest mb-4">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground mb-4">Add an extra layer of security to your account</p>
                  <Button variant="outline"><Shield className="size-4 mr-2" /> Enable 2FA</Button>
                </div>
                <div>
                  <h4 className="font-medium text-forest mb-4">Active Sessions</h4>
                  <p className="text-sm text-muted-foreground mb-4">Manage your active login sessions</p>
                  <Button variant="outline" className="text-red-600 hover:text-red-700 border-red-200">
                    <User className="size-4 mr-2" /> Sign Out All Sessions
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'integrations' && (
            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>Connect third-party services and APIs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { name: 'M-Pesa', description: 'Mobile money payments for donations', status: 'connected', icon: Database },
                  { name: 'Stripe', description: 'International card payments', status: 'disconnected', icon: Database },
                  { name: 'SendGrid', description: 'Transactional email service', status: 'connected', icon: Mail },
                  { name: 'Google Analytics', description: 'Website analytics and tracking', status: 'connected', icon: Globe },
                  { name: 'Facebook Pixel', description: 'Conversion tracking for ads', status: 'disconnected', icon: Globe },
                  { name: 'WhatsApp Business', description: 'Automated messaging', status: 'disconnected', icon: MessageSquare },
                ].map(item => (
                  <div key={item.name} className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-forest/10 flex items-center justify-center">
                        <item.icon className="size-5 text-forest" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-medium text-forest">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={cn('px-3 py-1 rounded-full text-xs font-medium',
                        item.status === 'connected' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      )}>
                        {item.status === 'connected' ? 'Connected' : 'Not Connected'}
                      </span>
                      <Button variant="outline" size="sm">
                        {item.status === 'connected' ? 'Manage' : 'Connect'}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
 
export default AdminSettingsPage;