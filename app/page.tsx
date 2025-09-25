"use client"

import { useState } from "react"
import { ProfileSelection } from "@/components/profile-selection"
import { MainBrowse } from "@/components/main-browse"

export default function NetflixClone() {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null)

  if (!selectedProfile) {
    return <ProfileSelection onSelectProfile={setSelectedProfile} />
  }

  return <MainBrowse profile={selectedProfile} />
}
