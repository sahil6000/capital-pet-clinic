import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import { AdminAuthProvider } from '@/admin/AdminAuth'
import AdminLayout from '@/admin/AdminLayout'

// Lazy-loaded public pages
const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const Services = lazy(() => import('@/pages/Services'))
const Doctors = lazy(() => import('@/pages/Doctors'))
const Gallery = lazy(() => import('@/pages/Gallery'))
const Blog = lazy(() => import('@/pages/Blog'))
const BlogPost = lazy(() => import('@/pages/BlogPost'))
const Reviews = lazy(() => import('@/pages/Reviews'))
const Contact = lazy(() => import('@/pages/Contact'))
const BookAppointment = lazy(() => import('@/pages/BookAppointment'))

// Lazy-loaded admin pages
const AdminDashboard = lazy(() => import('@/admin/pages/Dashboard'))
const AdminAppointments = lazy(() => import('@/admin/pages/Appointments'))
const AdminDoctors = lazy(() => import('@/admin/pages/Doctors'))
const AdminServices = lazy(() => import('@/admin/pages/Services'))
const AdminGallery = lazy(() => import('@/admin/pages/Gallery'))
const AdminBlog = lazy(() => import('@/admin/pages/Blog'))
const AdminTestimonials = lazy(() => import('@/admin/pages/Testimonials'))
const AdminInquiries = lazy(() => import('@/admin/pages/Inquiries'))
const AdminNotificationLogs = lazy(() => import('@/admin/pages/NotificationLogs'))
const AdminSettings = lazy(() => import('@/admin/pages/Settings'))

const PageLoader = () => (
  <div className="grid min-h-[40vh] place-items-center text-sm text-(--color-ink-soft)">Loading…</div>
)

export default function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/book-appointment" element={<BookAppointment />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="appointments" element={<AdminAppointments />} />
              <Route path="doctors" element={<AdminDoctors />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="inquiries" element={<AdminInquiries />} />
              <Route path="notifications" element={<AdminNotificationLogs />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </Suspense>
      </AdminAuthProvider>
    </BrowserRouter>
  )
}
