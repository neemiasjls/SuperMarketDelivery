'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Banner } from '@/types'
import { cn } from '@/lib/utils'

interface BannerCarouselProps {
  banners: Banner[]
}

export function BannerCarousel({ banners }: BannerCarouselProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(i => (i + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [banners.length])

  function prev() {
    setCurrent(i => (i - 1 + banners.length) % banners.length)
  }

  function next() {
    setCurrent(i => (i + 1) % banners.length)
  }

  return (
    <div className="relative w-full rounded-xl overflow-hidden group" style={{ height: '280px' }}>
      {banners.map((banner, idx) => (
        <Link
          key={banner.id}
          href={banner.link}
          className={cn(
            'absolute inset-0 transition-opacity duration-700',
            idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          )}
        >
          <div
            className="absolute inset-0 flex flex-col justify-center px-12 z-10"
            style={{ background: `linear-gradient(to right, ${banner.bgColor}ee, ${banner.bgColor}88, transparent)` }}
          >
            <h2 className="text-3xl font-extrabold text-white mb-2 drop-shadow">{banner.title}</h2>
            {banner.subtitle && (
              <p className="text-white/90 text-lg">{banner.subtitle}</p>
            )}
            <button className="mt-4 w-fit bg-white text-gray-800 font-bold px-5 py-2 rounded-full text-sm hover:bg-gray-100 transition-colors">
              Ver ofertas
            </button>
          </div>
          <Image
            src={banner.image}
            alt={banner.title}
            fill
            className="object-cover"
            priority={idx === 0}
          />
        </Link>
      ))}

      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
        aria-label="Banner anterior"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
        aria-label="Próximo banner"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={cn(
              'rounded-full transition-all',
              idx === current ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/60'
            )}
            aria-label={`Banner ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
