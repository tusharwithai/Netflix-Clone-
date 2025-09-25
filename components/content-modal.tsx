"use client"

import { useState } from "react"
import { X, Play, Plus, ThumbsUp, ThumbsDown, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { ContentItem } from "@/lib/content-data"

interface ContentModalProps {
  content: ContentItem | null
  isOpen: boolean
  onClose: () => void
}

export function ContentModal({ content, isOpen, onClose }: ContentModalProps) {
  const [isMuted, setIsMuted] = useState(true)
  const [isInMyList, setIsInMyList] = useState(false)
  const [userRating, setUserRating] = useState<"like" | "dislike" | null>(null)

  if (!isOpen || !content) return null

  const handleAddToList = () => {
    setIsInMyList(!isInMyList)
  }

  const handleRating = (rating: "like" | "dislike") => {
    setUserRating(userRating === rating ? null : rating)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative bg-background rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Hero Section */}
        <div className="relative h-96">
          <img
            src={content.image || "/placeholder.svg"}
            alt={content.title}
            className="w-full h-full object-cover rounded-t-lg"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent rounded-t-lg" />

          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full"
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Mute Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMuted(!isMuted)}
            className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full"
          >
            {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
          </Button>

          {/* Content Info Overlay */}
          <div className="absolute bottom-8 left-8 right-16">
            <h1 className="text-4xl font-bold text-white mb-4">{content.title}</h1>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 mb-4">
              <Button size="lg" className="bg-white text-black hover:bg-white/90 font-semibold px-8">
                <Play className="mr-2 h-5 w-5 fill-current" />
                Play
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={handleAddToList}
                className={`rounded-full border-2 ${
                  isInMyList
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-white border-white/70 hover:border-white"
                }`}
              >
                <Plus className={`h-5 w-5 ${isInMyList ? "rotate-45" : ""} transition-transform`} />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => handleRating("like")}
                className={`rounded-full border-2 ${
                  userRating === "like"
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-white border-white/70 hover:border-white"
                }`}
              >
                <ThumbsUp className="h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => handleRating("dislike")}
                className={`rounded-full border-2 ${
                  userRating === "dislike"
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-white border-white/70 hover:border-white"
                }`}
              >
                <ThumbsDown className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Metadata */}
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-green-500 font-semibold">98% Match</span>
                <Badge variant="outline" className="border-muted-foreground text-muted-foreground">
                  {content.rating}
                </Badge>
                <span className="text-muted-foreground">{content.year}</span>
                <span className="text-muted-foreground">{content.duration}</span>
                <Badge variant="outline" className="border-muted-foreground text-muted-foreground">
                  HD
                </Badge>
              </div>

              {/* Description */}
              <p className="text-foreground text-lg leading-relaxed mb-6">{content.description}</p>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Cast */}
              <div>
                <h3 className="text-muted-foreground text-sm font-semibold mb-2">Cast:</h3>
                <p className="text-foreground text-sm">
                  Millie Bobby Brown, Finn Wolfhard, Gaten Matarazzo, Caleb McLaughlin
                </p>
              </div>

              {/* Genres */}
              <div>
                <h3 className="text-muted-foreground text-sm font-semibold mb-2">Genres:</h3>
                <div className="flex flex-wrap gap-2">
                  {content.genre.map((genre) => (
                    <Badge key={genre} variant="secondary" className="text-xs">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div>
                <h3 className="text-muted-foreground text-sm font-semibold mb-2">Audio:</h3>
                <p className="text-foreground text-sm">{content.language}</p>
              </div>

              {/* Maturity Rating */}
              <div>
                <h3 className="text-muted-foreground text-sm font-semibold mb-2">Maturity Rating:</h3>
                <p className="text-foreground text-sm">
                  {content.rating} - {content.rating === "TV-MA" ? "For mature audiences" : "Suitable for teens and up"}
                </p>
              </div>
            </div>
          </div>

          {/* Episodes Section (for series) */}
          {content.type === "series" && (
            <div className="mt-8 border-t border-border pt-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Episodes</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((episode) => (
                  <div
                    key={episode}
                    className="flex items-start space-x-4 p-4 hover:bg-muted/20 rounded-lg cursor-pointer"
                  >
                    <div className="text-2xl font-bold text-muted-foreground w-8">{episode}</div>
                    <img
                      src="/placeholder.svg?height=80&width=140"
                      alt={`Episode ${episode}`}
                      className="w-36 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-foreground">Episode {episode}</h3>
                        <span className="text-muted-foreground text-sm">45m</span>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Episode description goes here. This would contain a brief summary of what happens in this
                        episode.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* More Like This */}
          <div className="mt-8 border-t border-border pt-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">More Like This</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-muted/20 rounded-lg overflow-hidden hover:bg-muted/30 cursor-pointer">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="Similar content"
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h4 className="font-semibold text-foreground text-sm mb-1">Similar Title {item}</h4>
                    <p className="text-muted-foreground text-xs">Brief description of similar content.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
