"use client"

import { useState } from "react"
import { Search, Bell, ChevronDown, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { searchContent, type ContentItem } from "@/lib/content-data"
import { NotificationPanel } from "@/components/notification-panel"
import { mockNotifications, type Notification } from "@/lib/notifications"

const navItems = ["Home", "TV Shows", "Movies", "New & Popular", "My List", "Browse by Languages"]

interface NavigationProps {
  activeCategory?: string
  onCategoryChange?: (category: string) => void
}

export function Navigation({ activeCategory = "Home", onCategoryChange }: NavigationProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<ContentItem[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      const results = searchContent(query)
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  const handleCategoryClick = (item: string) => {
    onCategoryChange?.(item)
  }

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const handleClearAll = () => {
    setNotifications([])
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 via-black/60 to-transparent backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 md:px-12 py-4">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div className="text-primary text-3xl font-bold">NETFLIX</div>

            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => handleCategoryClick(item)}
                  className={`text-sm font-medium transition-colors hover:text-accent ${
                    activeCategory === item ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-foreground">
                    Browse <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-card border-border">
                  {navItems.map((item) => (
                    <DropdownMenuItem
                      key={item}
                      onClick={() => handleCategoryClick(item)}
                      className="text-card-foreground hover:bg-muted"
                    >
                      {item}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center bg-black/80 border border-border rounded px-3 py-2">
                  <Input
                    type="text"
                    placeholder="Titles, people, genres"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="bg-transparent border-none text-foreground placeholder:text-muted-foreground focus:ring-0 w-64"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setIsSearchOpen(false)
                      setSearchQuery("")
                      setSearchResults([])
                    }}
                    className="text-foreground hover:text-accent ml-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className="text-foreground hover:text-accent"
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}

              {/* Search Results Dropdown */}
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-black/95 border border-border rounded-md max-h-96 overflow-y-auto">
                  {searchResults.map((item) => (
                    <div key={item.id} className="flex items-center p-3 hover:bg-muted/20 cursor-pointer">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-16 h-24 object-cover rounded mr-3"
                      />
                      <div>
                        <h4 className="text-foreground font-medium">{item.title}</h4>
                        <p className="text-muted-foreground text-sm">
                          {item.year} • {item.type}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-foreground hover:text-accent"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Button>
            </div>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 text-foreground hover:text-accent">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/user-profile-avatar.png" />
                    <AvatarFallback className="bg-primary text-primary-foreground">U</AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border w-48">
                <DropdownMenuItem className="text-card-foreground hover:bg-muted">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src="/male-profile-avatar.png" />
                    </Avatar>
                    <span>John</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-card-foreground hover:bg-muted">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src="/female-profile-avatar.png" />
                    </Avatar>
                    <span>Sarah</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-card-foreground hover:bg-muted">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src="/kids-cartoon-avatar.jpg" />
                    </Avatar>
                    <span>Kids</span>
                  </div>
                </DropdownMenuItem>
                <div className="border-t border-border my-1" />
                <DropdownMenuItem className="text-card-foreground hover:bg-muted">Manage Profiles</DropdownMenuItem>
                <DropdownMenuItem className="text-card-foreground hover:bg-muted">Account</DropdownMenuItem>
                <DropdownMenuItem className="text-card-foreground hover:bg-muted">Help Center</DropdownMenuItem>
                <div className="border-t border-border my-1" />
                <DropdownMenuItem className="text-card-foreground hover:bg-muted">Sign out of Netflix</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      <NotificationPanel
        notifications={notifications}
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onDeleteNotification={handleDeleteNotification}
        onClearAll={handleClearAll}
      />
    </>
  )
}
