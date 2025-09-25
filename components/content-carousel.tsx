"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight, Play, Plus, ThumbsUp, ChevronDown, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ContentModal } from "@/components/content-modal"
import type { ContentItem } from "@/lib/content-data"

interface ContentCarouselProps {
  title: string
  items: ContentItem[]
}

export function ContentCarousel({ title, items }: ContentCarouselProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.clientWidth
      const scrollAmount = containerWidth * 0.8 // Scroll 80% of container width
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const handleMoreInfo = (item: ContentItem) => {
    setSelectedContent(item)
    setIsModalOpen(true)
  }

  const getEpisodeInfo = (item: ContentItem) => {
    if (item.type === "series") {
      return {
        season: Math.floor(Math.random() * 5) + 1,
        episode: Math.floor(Math.random() * 12) + 1,
        title: `"${item.title.split(" ").slice(-2).join(" ")}"`,
        progress: Math.floor(Math.random() * 45) + 5,
        duration: Math.floor(Math.random() * 20) + 35,
      }
    }
    return null
  }

  return (
    <>
      <div className="group relative mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 px-4 md:px-12">{title}</h2>

        <div className="relative px-4 md:px-12">
          {/* Left Arrow */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 h-full rounded-none border-none shadow-lg"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          {/* Right Arrow */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 h-full rounded-none border-none shadow-lg"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          {/* Carousel */}
          <div
            ref={scrollRef}
            className="flex gap-1 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {items.map((item, index) => {
              const episodeInfo = getEpisodeInfo(item)
              const isHovered = hoveredItem === item.id

              return (
                <div
                  key={item.id}
                  className={`flex-shrink-0 group/item cursor-pointer snap-start transition-all duration-300 ${
                    isHovered ? "w-[420px] md:w-[500px] z-50" : "w-[280px] md:w-[350px]"
                  }`}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Card
                    className={`relative overflow-hidden bg-zinc-900 border-none transition-all duration-300 ${
                      isHovered ? "scale-110 shadow-2xl" : "scale-100"
                    }`}
                  >
                    <div className="relative">
                      <div className={`relative overflow-hidden ${isHovered ? "h-[200px]" : "h-[200px]"}`}>
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover object-center"
                        />
                        
                        {/* Black highlight overlay on hover */}
                        <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
                          isHovered ? "opacity-100" : "opacity-0"
                        }`} />
                        
                        {/* Top right volume control when hovered */}
                        {isHovered && (
                          <div className="absolute top-4 right-4">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setIsMuted(!isMuted)}
                              className="bg-black/60 hover:bg-black/80 text-white h-8 w-8 rounded-full"
                            >
                              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                            </Button>
                          </div>
                        )}
                      </div>

                      {/* Details section below the image */}
                      {isHovered && (
                        <div className="bg-zinc-900 p-4 space-y-3">
                          {/* Episode info for TV shows */}
                          {episodeInfo && (
                            <div className="space-y-2">
                              <div className="text-white text-lg font-semibold leading-tight">
                                S{episodeInfo.season}:E{episodeInfo.episode} {episodeInfo.title}
                              </div>

                              {/* Progress bar */}
                              <div className="space-y-1">
                                <div className="w-full bg-zinc-700 h-1 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-red-600 transition-all duration-300"
                                    style={{ width: `${(episodeInfo.progress / episodeInfo.duration) * 100}%` }}
                                  />
                                </div>
                                <div className="text-zinc-400 text-sm">
                                  {episodeInfo.progress} of {episodeInfo.duration}m
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Movie title for movies */}
                          {!episodeInfo && (
                            <h3 className="text-white text-xl font-bold leading-tight">{item.title}</h3>
                          )}

                          {/* Action buttons */}
                          <div className="flex items-center gap-2 py-1">
                            <Button
                              size="icon"
                              className="bg-white text-black hover:bg-gray-200 h-10 w-10 rounded-full"
                            >
                              <Play className="h-5 w-5 fill-current ml-0.5" />
                            </Button>

                            <Button
                              variant="outline"
                              size="icon"
                              className="border-2 border-zinc-500 text-white hover:border-white bg-transparent h-10 w-10 rounded-full"
                            >
                              <Plus className="h-5 w-5" />
                            </Button>

                            <Button
                              variant="outline"
                              size="icon"
                              className="border-2 border-zinc-500 text-white hover:border-white bg-transparent h-10 w-10 rounded-full"
                            >
                              <ThumbsUp className="h-5 w-5" />
                            </Button>

                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleMoreInfo(item)}
                              className="border-2 border-zinc-500 text-white hover:border-white bg-transparent h-10 w-10 ml-auto rounded-full"
                            >
                              <ChevronDown className="h-5 w-5" />
                            </Button>
                          </div>

                          <div className="flex items-center gap-3 text-sm text-zinc-300 flex-wrap">
                            <span className="text-green-500 font-semibold">{Math.floor(Math.random() * 40) + 60}% Match</span>
                            <span className="border border-zinc-500 px-1.5 py-0.5 text-xs">{item.rating}</span>
                            <span>{item.year}</span>
                            {item.type === "series" && (
                              <span>
                                {Math.floor(Math.random() * 6) + 1} Season{Math.floor(Math.random() * 6) + 1 > 1 ? "s" : ""}
                              </span>
                            )}
                          </div>

                          {/* Genres */}
                          <div className="text-sm text-zinc-400">{item.genre.slice(0, 3).join(" • ")}</div>
                        </div>
                      )}

                      {/* Simple overlay for non-hovered state */}
                      {!isHovered && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-200">
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-white text-lg font-semibold">{item.title}</h3>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <ContentModal content={selectedContent} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
