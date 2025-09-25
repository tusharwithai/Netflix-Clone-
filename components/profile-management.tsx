"use client"

import { useState } from "react"
import { X, Edit, Plus, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface Profile {
  id: string
  name: string
  avatar: string
  isKids?: boolean
  language: string
  maturityRating: string
}

interface ProfileManagementProps {
  isOpen: boolean
  onClose: () => void
  profiles: Profile[]
  onUpdateProfiles: (profiles: Profile[]) => void
}

const avatarOptions = [
  "/male-profile-avatar.png",
  "/female-profile-avatar.png",
  "/kids-cartoon-avatar.jpg",
  "/guest-profile-avatar.jpg",
]

export function ProfileManagement({ isOpen, onClose, profiles, onUpdateProfiles }: ProfileManagementProps) {
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    avatar: avatarOptions[0],
    isKids: false,
    language: "English",
    maturityRating: "All",
  })

  if (!isOpen) return null

  const handleCreateProfile = () => {
    setIsCreating(true)
    setFormData({
      name: "",
      avatar: avatarOptions[0],
      isKids: false,
      language: "English",
      maturityRating: "All",
    })
  }

  const handleEditProfile = (profile: Profile) => {
    setEditingProfile(profile)
    setFormData({
      name: profile.name,
      avatar: profile.avatar,
      isKids: profile.isKids || false,
      language: profile.language,
      maturityRating: profile.maturityRating,
    })
  }

  const handleSaveProfile = () => {
    const newProfile: Profile = {
      id: editingProfile?.id || Date.now().toString(),
      name: formData.name,
      avatar: formData.avatar,
      isKids: formData.isKids,
      language: formData.language,
      maturityRating: formData.isKids ? "Kids" : formData.maturityRating,
    }

    let updatedProfiles
    if (editingProfile) {
      updatedProfiles = profiles.map((p) => (p.id === editingProfile.id ? newProfile : p))
    } else {
      updatedProfiles = [...profiles, newProfile]
    }

    onUpdateProfiles(updatedProfiles)
    setEditingProfile(null)
    setIsCreating(false)
  }

  const handleDeleteProfile = (profileId: string) => {
    const updatedProfiles = profiles.filter((p) => p.id !== profileId)
    onUpdateProfiles(updatedProfiles)
  }

  const handleCancel = () => {
    setEditingProfile(null)
    setIsCreating(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative bg-background rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-foreground">Manage Profiles</h1>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Profile Form */}
          {(editingProfile || isCreating) && (
            <div className="mb-8 p-6 border border-border rounded-lg">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                {editingProfile ? "Edit Profile" : "Add Profile"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Avatar Selection */}
                <div>
                  <Label className="text-foreground mb-4 block">Profile Icon</Label>
                  <div className="grid grid-cols-4 gap-4">
                    {avatarOptions.map((avatar) => (
                      <button
                        key={avatar}
                        onClick={() => setFormData({ ...formData, avatar })}
                        className={`relative rounded-full transition-all ${
                          formData.avatar === avatar ? "ring-4 ring-accent" : ""
                        }`}
                      >
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={avatar || "/placeholder.svg"} />
                          <AvatarFallback>?</AvatarFallback>
                        </Avatar>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Profile Details */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-foreground">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1"
                      placeholder="Enter profile name"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="kids"
                      checked={formData.isKids}
                      onCheckedChange={(checked) => setFormData({ ...formData, isKids: checked })}
                    />
                    <Label htmlFor="kids" className="text-foreground">
                      Kids Profile
                    </Label>
                  </div>

                  <div>
                    <Label htmlFor="language" className="text-foreground">
                      Language
                    </Label>
                    <select
                      id="language"
                      value={formData.language}
                      onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                      className="mt-1 w-full p-2 bg-background border border-border rounded-md text-foreground"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Korean">Korean</option>
                    </select>
                  </div>

                  {!formData.isKids && (
                    <div>
                      <Label htmlFor="maturity" className="text-foreground">
                        Maturity Rating
                      </Label>
                      <select
                        id="maturity"
                        value={formData.maturityRating}
                        onChange={(e) => setFormData({ ...formData, maturityRating: e.target.value })}
                        className="mt-1 w-full p-2 bg-background border border-border rounded-md text-foreground"
                      >
                        <option value="All">All Maturity Ratings</option>
                        <option value="Teen">Teen and Below</option>
                        <option value="Mature">Mature</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSaveProfile} disabled={!formData.name.trim()}>
                  {editingProfile ? "Save Changes" : "Create Profile"}
                </Button>
              </div>
            </div>
          )}

          {/* Profiles Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {profiles.map((profile) => (
              <div key={profile.id} className="text-center">
                <div className="relative group">
                  <Avatar className="w-32 h-32 mx-auto mb-4">
                    <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                    <AvatarFallback className="text-2xl">{profile.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEditProfile(profile)}
                      className="text-white hover:text-accent"
                    >
                      <Edit className="h-5 w-5" />
                    </Button>
                    {profiles.length > 1 && (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDeleteProfile(profile.id)}
                        className="text-white hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-medium text-foreground">{profile.name}</h3>
                {profile.isKids && <span className="text-sm text-muted-foreground">Kids Profile</span>}
              </div>
            ))}

            {/* Add Profile Button */}
            {profiles.length < 5 && !isCreating && !editingProfile && (
              <div className="text-center">
                <button
                  onClick={handleCreateProfile}
                  className="w-32 h-32 mx-auto mb-4 border-2 border-dashed border-muted-foreground rounded-full flex items-center justify-center hover:border-accent transition-colors group"
                >
                  <Plus className="h-12 w-12 text-muted-foreground group-hover:text-accent" />
                </button>
                <h3 className="text-lg font-medium text-muted-foreground">Add Profile</h3>
              </div>
            )}
          </div>

          {/* Done Button */}
          <div className="text-center">
            <Button onClick={onClose} size="lg">
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
