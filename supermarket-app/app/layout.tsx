import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartSidebar } from '@/components/layout/CartSidebar'
import { AuthModals } from '@/components/auth/AuthModals'
import { ToastContainer } from '@/components/ui/Toast'
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat'
import { BackToTop } from '@/components/ui/BackToTop'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })

export const metadata: Metadata = {
  title: 'Supermercado — Vila Aurora/SP',
  description: 'Desde 1995, servindo bem, para servir sempre. Compre online com entrega em Vila Aurora e região. Hortifruti, açougue, bebidas e muito mais.',
  keywords: 'supermercado, vila aurora, delivery, hortifruti, açougue, ofertas, supermercado online',
  openGraph: {
    title: 'Supermercado — Vila Aurora/SP',
    description: 'Desde 1995, os melhores preços da cidade.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased bg-[#f8fafc]">
        <Header />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />

        {/* Overlays & global UI */}
        <CartSidebar />
        <AuthModals />

        {/* UX layer */}
        <ToastContainer />
        <WhatsAppFloat />
        <BackToTop />
      </body>
    </html>
  )
}
