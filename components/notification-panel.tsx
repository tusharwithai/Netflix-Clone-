"use client"

import { useState } from "react"
import { X, Check, Trash2, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { type Notification, formatTimeAgo } from "@/lib/notifications"

interface NotificationPanelProps {
  notifications: Notification[]
  isOpen: boolean
  onClose: () => void
  onMarkAsRead: (id: string) => void
  onMarkAllAsRead: () => void
  onDeleteNotification: (id: string) => void
  onClearAll: () => void
}

export function NotificationPanel({
  notifications,
  isOpen,
  onClose,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
  onClearAll,
}: NotificationPanelProps) {
  const [filter, setFilter] = useState<"all" | "unread">("all")

  if (!isOpen) return null

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const filteredNotifications = filter === "unread" ? notifications.filter((n) => !n.isRead) : notifications

  const getTypeColor = (type: Notification["type"]) => {
    switch (type) {
      case "new_episode":
        return "bg-green-500"
      case "recommendation":
        return "bg-blue-500"
      case "reminder":
        return "bg-yellow-500"
      case "system":
        return "bg-gray-500"
      default:
        return "bg-primary"
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end pt-16 pr-4">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-black/95 border border-border rounded-lg w-96 max-h-[80vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2 mb-4">
            <Button
              variant={filter === "all" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("all")}
              className="text-xs"
            >
              All ({notifications.length})
            </Button>
            <Button
              variant={filter === "unread" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("unread")}
              className="text-xs"
            >
              Unread ({unreadCount})
            </Button>
          </div>

          {/* Actions */}
          {notifications.length > 0 && (
            <div className="flex space-x-2">
              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={onMarkAllAsRead} className="text-xs bg-transparent">
                  <Check className="h-3 w-3 mr-1" />
                  Mark all read
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={onClearAll} className="text-xs bg-transparent">
                <Trash2 className="h-3 w-3 mr-1" />
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">
                {filter === "unread" ? "No unread notifications" : "No notifications"}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b border-border/50 hover:bg-muted/10 cursor-pointer group ${
                  !notification.isRead ? "bg-muted/5" : ""
                }`}
                onClick={() => !notification.isRead && onMarkAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3">
                  {/* Content Image */}
                  {notification.imageUrl && (
                    <img
                      src={notification.imageUrl || "/placeholder.svg"}
                      alt=""
                      className="w-12 h-16 object-cover rounded flex-shrink-0"
                    />
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className={`w-2 h-2 rounded-full ${getTypeColor(notification.type)}`} />
                        <h3 className="font-medium text-foreground text-sm truncate">{notification.title}</h3>
                        {!notification.isRead && <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />}
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          onDeleteNotification(notification.id)
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>

                    <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{notification.message}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{formatTimeAgo(notification.timestamp)}</span>

                      <Badge variant="outline" className="text-xs">
                        {notification.type.replace("_", " ")}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <Button variant="ghost" size="sm" className="w-full text-xs">
            <Settings className="h-3 w-3 mr-2" />
            Notification Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
