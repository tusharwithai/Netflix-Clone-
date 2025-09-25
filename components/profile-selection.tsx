"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ProfileManagement } from "@/components/profile-management"

interface Profile {
  id: string
  name: string
  avatar: string
  isKids?: boolean
  language: string
  maturityRating: string
}

const defaultProfiles: Profile[] = [
  { id: "1", name: "John", avatar: "/male-profile-avatar.png", language: "English", maturityRating: "All" },
  { id: "2", name: "Sarah", avatar: "/female-profile-avatar.png", language: "English", maturityRating: "All" },
  {
    id: "3",
    name: "Kids",
    avatar: "/kids-cartoon-avatar.jpg",
    isKids: true,
    language: "English",
    maturityRating: "Kids",
  },
  { id: "4", name: "Guest", avatar: "/guest-profile-avatar.jpg", language: "English", maturityRating: "All" },
]

interface ProfileSelectionProps {
  onSelectProfile: (profileId: string) => void
}

export function ProfileSelection({ onSelectProfile }: ProfileSelectionProps) {
  const [hoveredProfile, setHoveredProfile] = useState<string | null>(null)
  const [profiles, setProfiles] = useState<Profile[]>(defaultProfiles)
  const [showManagement, setShowManagement] = useState(false)

  return (
    <>
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-foreground mb-4">Who's watching?</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="flex flex-col items-center cursor-pointer group"
              onMouseEnter={() => setHoveredProfile(profile.id)}
              onMouseLeave={() => setHoveredProfile(null)}
              onClick={() => onSelectProfile(profile.id)}
            >
              <div
                className={`relative transition-all duration-300 ${
                  hoveredProfile === profile.id ? "scale-110" : "scale-100"
                }`}
              >
                <Avatar className="w-32 h-32 border-4 border-transparent group-hover:border-accent transition-all duration-300">
                  <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                  <AvatarFallback className="text-2xl bg-muted">{profile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {hoveredProfile === profile.id && (
                  <div className="absolute inset-0 bg-accent/20 rounded-full animate-pulse" />
                )}
              </div>
              <p
                className={`mt-4 text-xl font-medium transition-colors duration-300 ${
                  hoveredProfile === profile.id ? "text-accent" : "text-foreground"
                }`}
              >
                {profile.name}
              </p>
              {profile.isKids && <span className="text-sm text-muted-foreground">Kids</span>}
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="lg"
          onClick={() => setShowManagement(true)}
          className="border-muted-foreground text-muted-foreground hover:border-accent hover:text-accent bg-transparent"
        >
          Manage Profiles
        </Button>
      </div>

      <ProfileManagement
        isOpen={showManagement}
        onClose={() => setShowManagement(false)}
        profiles={profiles}
        onUpdateProfiles={setProfiles}
      />
    </>
  )
}
