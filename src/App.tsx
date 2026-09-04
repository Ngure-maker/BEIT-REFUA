import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { AdminLayout } from '@/admin/AdminLayout';
import { AuthProvider, useAuth } from '@/admin/AuthContext';
import { HomePage } from '@/pages/HomePage';
import { WhoWeArePage } from '@/pages/WhoWeArePage';
import { HealthcarePage } from '@/pages/HealthcarePage';
import { ProgramsPage } from '@/pages/ProgramsPage';
import { ImpactPage } from '@/pages/ImpactPage';
import { StoriesPage } from '@/pages/StoriesPage';
import { StoryDetailPage } from '@/pages/StoryDetailPage';
import { GetInvolvedPage } from '@/pages/GetInvolvedPage';
import { ContactPage } from '@/pages/ContactPage';
import { GalleryPage } from '@/pages/GalleryPage';
import { AdminLoginPage } from '@/pages/AdminLoginPage';
import { AdminDashboardPage } from '@/pages/AdminDashboardPage';
import { AdminProgramsPage } from '@/pages/AdminProgramsPage';
import { AdminStoriesPage } from '@/pages/AdminStoriesPage';
import { AdminGalleryPage } from '@/pages/AdminGalleryPage';
import { AdminImpactReportsPage } from '@/pages/AdminImpactReportsPage';
import { AdminPrayerRequestsPage } from '@/pages/AdminPrayerRequestsPage';
import { AdminVolunteersPage } from '@/pages/AdminVolunteersPage';
import { AdminPartnershipsPage } from '@/pages/AdminPartnershipsPage';
import { AdminContactMessagesPage } from '@/pages/AdminContactMessagesPage';
import { AdminSettingsPage } from '@/pages/AdminSettingsPage';
import { AdminPrayerRequestDetailPage } from '@/pages/AdminPrayerRequestDetailPage';
import { AdminVolunteerDetailPage } from '@/pages/AdminVolunteerDetailPage';
import { AdminVolunteerEditPage } from '@/pages/AdminVolunteerEditPage';
import { AdminPartnershipDetailPage } from '@/pages/AdminPartnershipDetailPage';
import { AdminPartnershipEditPage } from '@/pages/AdminPartnershipEditPage';
import { AdminContactMessageDetailPage } from '@/pages/AdminContactMessageDetailPage';
import { AdminStoryDetailPage } from '@/pages/AdminStoryDetailPage';
import { AdminStoryEditPage } from '@/pages/AdminStoryEditPage';
import { AdminImpactReportDetailPage } from '@/pages/AdminImpactReportDetailPage';
import { AdminImpactReportEditPage } from '@/pages/AdminImpactReportEditPage';
import { AdminProgramEditPage } from '@/pages/AdminProgramEditPage';
import { AdminGalleryUploadPage } from '@/pages/AdminGalleryUploadPage';
import { AdminGalleryImageEditPage } from '@/pages/AdminGalleryImageEditPage';
import { AdminImageLibraryPage } from '@/pages/AdminImageLibraryPage';
import { AdminPageEditorPage } from '@/pages/AdminPageEditorPage';
import { SiteContentProvider } from '@/data/SiteContentContext';

function NotFoundPage() {
  return (
    <div className="container-x flex flex-col items-center justify-center py-32 text-center">
      <p className="font-display text-7xl text-gold">404</p>
      <h1 className="mt-4 text-3xl font-display text-forest">Page not found</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <a
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-md bg-gold px-7 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-gold-foreground transition-colors hover:bg-gold/90"
      >
        Back to Home
      </a>
    </div>
  );
}

// Wrap page content with a subtle fade-in transition on route change
function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

function PublicRoutes() {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <HomePage />
              </PageTransition>
            }
          />
          <Route
            path="/who-we-are"
            element={
              <PageTransition>
                <WhoWeArePage />
              </PageTransition>
            }
          />
          <Route
            path="/healthcare"
            element={
              <PageTransition>
                <HealthcarePage />
              </PageTransition>
            }
          />
          <Route
            path="/programs"
            element={
              <PageTransition>
                <ProgramsPage />
              </PageTransition>
            }
          />
          <Route
            path="/impact"
            element={
              <PageTransition>
                <ImpactPage />
              </PageTransition>
            }
          />
          <Route
            path="/stories"
            element={
              <PageTransition>
                <StoriesPage />
              </PageTransition>
            }
          />
          <Route
            path="/stories/:slug"
            element={
              <PageTransition>
                <StoryDetailPage />
              </PageTransition>
            }
          />
          <Route
            path="/gallery"
            element={
              <PageTransition>
                <GalleryPage />
              </PageTransition>
            }
          />
          <Route
            path="/get-involved"
            element={
              <PageTransition>
                <GetInvolvedPage />
              </PageTransition>
            }
          />
          <Route
            path="/contact"
            element={
              <PageTransition>
                <ContactPage />
              </PageTransition>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

function AdminRoutes() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gold border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <AdminLayout />;
}

function AuthRoutes() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gold border-t-transparent" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <AdminLoginPage />;
}

export function App() {
  return (
    <SiteContentProvider>
      <AuthProvider>
        <Routes>
        <Route path="/auth/login" element={<AuthRoutes />} />
        <Route element={<AdminRoutes />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/programs" element={<AdminProgramsPage />} />
          <Route path="/admin/programs/new" element={<AdminProgramsPage />} />
          <Route path="/admin/programs/:id" element={<AdminProgramsPage />} />
          <Route path="/admin/programs/:id/edit" element={<AdminProgramEditPage />} />
          <Route path="/admin/stories" element={<AdminStoriesPage />} />
          <Route path="/admin/stories/new" element={<AdminStoriesPage />} />
          <Route path="/admin/stories/:id" element={<AdminStoryDetailPage />} />
          <Route path="/admin/stories/:id/edit" element={<AdminStoryEditPage />} />
          <Route path="/admin/gallery" element={<AdminGalleryPage />} />
          <Route path="/admin/gallery/upload" element={<AdminGalleryUploadPage />} />
          <Route path="/admin/gallery/:id" element={<AdminGalleryImageEditPage />} />
          <Route path="/admin/impact-reports" element={<AdminImpactReportsPage />} />
          <Route path="/admin/impact-reports/new" element={<AdminImpactReportsPage />} />
          <Route path="/admin/impact-reports/:id" element={<AdminImpactReportDetailPage />} />
          <Route path="/admin/impact-reports/:id/edit" element={<AdminImpactReportEditPage />} />
          <Route path="/admin/prayer-requests" element={<AdminPrayerRequestsPage />} />
          <Route path="/admin/prayer-requests/:id" element={<AdminPrayerRequestDetailPage />} />
          <Route path="/admin/volunteers" element={<AdminVolunteersPage />} />
          <Route path="/admin/volunteers/:id" element={<AdminVolunteerDetailPage />} />
          <Route path="/admin/volunteers/:id/edit" element={<AdminVolunteerEditPage />} />
          <Route path="/admin/partnerships" element={<AdminPartnershipsPage />} />
          <Route path="/admin/partnerships/:id" element={<AdminPartnershipDetailPage />} />
          <Route path="/admin/partnerships/:id/edit" element={<AdminPartnershipEditPage />} />
          <Route path="/admin/contact-messages" element={<AdminContactMessagesPage />} />
          <Route path="/admin/contact-messages/:id" element={<AdminContactMessageDetailPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
          <Route path="/admin/image-library" element={<AdminImageLibraryPage />} />
          <Route path="/admin/page-editor" element={<AdminPageEditorPage />} />
        </Route>
        <Route path="/*" element={<PublicRoutes />} />
      </Routes>
      </AuthProvider>
    </SiteContentProvider>
  );
}

export default App;