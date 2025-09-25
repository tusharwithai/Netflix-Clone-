export interface Notification {
  id: string
  title: string
  message: string
  type: "new_episode" | "recommendation" | "reminder" | "system"
  timestamp: Date
  isRead: boolean
  contentId?: string
  imageUrl?: string
}

export const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Episodes Available",
    message: "Stranger Things Season 4 - 2 new episodes are now streaming",
    type: "new_episode",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isRead: false,
    contentId: "1",
    imageUrl: "/stranger-things-inspired-poster.png",
  },
  {
    id: "2",
    title: "Added to Your List",
    message: "The Crown Season 6 has been added to your watchlist",
    type: "system",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    isRead: false,
    contentId: "2",
    imageUrl: "/the-crown-poster.jpg",
  },
  {
    id: "3",
    title: "Recommended for You",
    message: "Based on your viewing history, you might like Money Heist",
    type: "recommendation",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    isRead: true,
    contentId: "6",
    imageUrl: "/money-heist-inspired-poster.png",
  },
  {
    id: "4",
    title: "Continue Watching",
    message: "You left off at Episode 3 of Ozark Season 2",
    type: "reminder",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    isRead: true,
    contentId: "4",
    imageUrl: "/ozark-poster.jpg",
  },
  {
    id: "5",
    title: "New Content Alert",
    message: "Red Notice is now available in your region",
    type: "new_episode",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    isRead: true,
    contentId: "16",
    imageUrl: "/red-notice-poster.jpg",
  },
]

export const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "new_episode":
      return "🎬"
    case "recommendation":
      return "💡"
    case "reminder":
      return "⏰"
    case "system":
      return "📱"
    default:
      return "📢"
  }
}

export const formatTimeAgo = (date: Date): string => {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return "Just now"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  return `${Math.floor(diffInSeconds / 604800)}w ago`
}
