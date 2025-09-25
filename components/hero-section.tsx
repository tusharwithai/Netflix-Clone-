"use client"

import { useState } from "react"
import { Play, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContentModal } from "@/components/content-modal"
import { allContent } from "@/lib/content-data"

export function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const heroContent = allContent[0] // Using Stranger Things as hero content

  return (
    <>
      <div className="relative h-screen flex items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(20, 20, 20, 0.8) 0%, rgba(20, 20, 20, 0.4) 50%, rgba(20, 20, 20, 0.8) 100%), url('/placeholder-9p5de.png')`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 px-4 md:px-12 max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 text-balance">Stranger Things</h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed text-pretty">
            When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying
            supernatural forces, and one strange little girl.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 font-semibold px-8 py-3 text-lg"
            >
              <Play className="mr-2 h-6 w-6 fill-current" />
              Play
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="bg-muted/70 text-foreground hover:bg-muted/90 font-semibold px-8 py-3 text-lg backdrop-blur-sm"
            >
              <Info className="mr-2 h-6 w-6" />
              More Info
            </Button>
          </div>
        </div>

        {/* Gradient Overlay at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <ContentModal content={heroContent} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
