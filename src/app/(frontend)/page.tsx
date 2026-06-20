/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPayload, type SanitizedConfig } from 'payload'
import configPromise from '@payload-config'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Amenities } from '@/components/Amenities'
import { RoomsSection } from '@/components/RoomsSection'
import { BreakfastsSection } from '@/components/BreakfastsSection'
import { GallerySection } from '@/components/GallerySection'
import { ExperiencesSection } from '@/components/ExperiencesSection'
import { ReviewsSection } from '@/components/ReviewsSection'
import { LocationSection } from '@/components/LocationSection'
import { ContactSection } from '@/components/ContactSection'

async function getSiteData() {
  try {
    const payload = await getPayload({
      config: configPromise as unknown as Promise<SanitizedConfig>,
    })
    const [
      rooms,
      breakfasts,
      gallery,
      experiences,
      reviews,
      siteSettings,
      heroContent,
      aboutContent,
    ] = await Promise.all([
      payload.find({ collection: 'rooms', limit: 12, sort: 'order' }),
      payload.find({ collection: 'breakfasts', limit: 10, sort: 'order' }),
      payload.find({ collection: 'gallery', limit: 40, sort: 'order' }),
      payload.find({ collection: 'experiences', limit: 12, sort: 'order' }),
      payload.find({ collection: 'reviews', limit: 12 }),
      payload.findGlobal({ slug: 'site-settings' }),
      payload.findGlobal({ slug: 'hero-content' }),
      payload.findGlobal({ slug: 'about-content' }),
    ])
    return {
      rooms: rooms.docs as any[],
      breakfasts: breakfasts.docs as any[],
      gallery: gallery.docs as any[],
      experiences: experiences.docs as any[],
      reviews: reviews.docs as any[],
      siteSettings: siteSettings as any,
      heroContent: heroContent as any,
      aboutContent: aboutContent as any,
    }
  } catch {
    return null
  }
}

export default async function HomePage() {
  const data = await getSiteData()

  return (
    <main>
      <Hero data={data?.heroContent} />
      <About data={data?.aboutContent} />
      <Amenities />
      <RoomsSection rooms={data?.rooms ?? []} />
      <BreakfastsSection breakfasts={data?.breakfasts ?? []} />
      <GallerySection images={data?.gallery ?? []} />
      <ExperiencesSection experiences={data?.experiences ?? []} />
      <ReviewsSection reviews={data?.reviews ?? []} settings={data?.siteSettings} />
      <LocationSection settings={data?.siteSettings} />
      <ContactSection settings={data?.siteSettings} />
    </main>
  )
}
