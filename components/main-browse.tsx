"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ContentCarousel } from "@/components/content-carousel"
import { getCarouselData } from "@/lib/content-data"

interface MainBrowseProps {
  profile: string
}

export function MainBrowse({ profile }: MainBrowseProps) {
  const [activeCategory, setActiveCategory] = useState("Home")
  const carouselData = getCarouselData(activeCategory)

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <HeroSection />
      <div className="px-4 md:px-12 pb-20 space-y-8">
        {carouselData.map((carousel, index) => (
          <ContentCarousel key={`${activeCategory}-${index}`} title={carousel.title} items={carousel.items} />
        ))}
      </div>
    </div>
  )
}
