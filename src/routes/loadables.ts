import loadable from '@loadable/component'

// ------------------
// ----- Layouts -----
// ------------------

export const RootLayout = loadable(() => import('@/layouts/root-layout'))
export const RouteLayout = loadable(() => import('@/layouts/route'))
export const DetailLayout = loadable(() => import('@/layouts/children/detail'))
export const KategoriLayout = loadable(
  () => import('@/layouts/children/kategori'),
)

// ------------------
// ----- Pages -----
// ------------------

export const ComingSoonPage = loadable(() => import('@/pages/coming-soon'))
export const HomePage = loadable(() => import('@/pages/home'))
export const HalamanPage = loadable(() => import('@/pages/halaman'))
export const ProgramPage = loadable(() => import('@/pages/program'))
export const TentangKamiPage = loadable(() => import('@/pages/tentang-kami'))
export const ProgramDetailPage = loadable(
  () => import('@/pages/program-details'),
)
export const ProfilPage = loadable(() => import('@/pages/profil'))
export const FaqPage = loadable(() => import('@/pages/faq'))
export const GaleriPage = loadable(() => import('@/pages/galeri'))
