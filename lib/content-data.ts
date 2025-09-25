export interface ContentItem {
  id: string
  title: string
  image: string
  type: "movie" | "series"
  genre: string[]
  year: number
  rating: string
  duration: string
  description: string
  isNew?: boolean
  isPopular?: boolean
  isOriginal?: boolean
  language: string
}

export const allContent: ContentItem[] = [
  // Trending Now
  {
    id: "1",
    title: "Stranger Things",
    image: "/stranger-things-inspired-poster.png",
    type: "series",
    genre: ["Sci-Fi", "Horror", "Drama"],
    year: 2016,
    rating: "TV-14",
    duration: "4 Seasons",
    description:
      "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    isPopular: true,
    isOriginal: true,
    language: "English",
  },
  {
    id: "2",
    title: "The Crown",
    image: "/the-crown-poster.jpg",
    type: "series",
    genre: ["Drama", "Biography", "History"],
    year: 2016,
    rating: "TV-MA",
    duration: "6 Seasons",
    description:
      "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
    isPopular: true,
    isOriginal: true,
    language: "English",
  },
  {
    id: "3",
    title: "Squid Game",
    image: "/generic-survival-game-poster.png",
    type: "series",
    genre: ["Thriller", "Drama"],
    year: 2021,
    rating: "TV-MA",
    duration: "1 Season",
    description:
      "Hundreds of cash-strapped players accept a strange invitation to compete in children's games for a tempting prize.",
    isNew: true,
    isPopular: true,
    isOriginal: true,
    language: "Korean",
  },
  {
    id: "4",
    title: "Ozark",
    image: "/ozark-poster.jpg",
    type: "series",
    genre: ["Crime", "Drama", "Thriller"],
    year: 2017,
    rating: "TV-MA",
    duration: "4 Seasons",
    description:
      "A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder money to appease a drug boss.",
    isOriginal: true,
    language: "English",
  },
  {
    id: "5",
    title: "The Witcher",
    image: "/witcher-inspired-poster.png",
    type: "series",
    genre: ["Fantasy", "Adventure", "Drama"],
    year: 2019,
    rating: "TV-MA",
    duration: "3 Seasons",
    description:
      "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
    isOriginal: true,
    language: "English",
  },
  {
    id: "6",
    title: "Money Heist",
    image: "/money-heist-inspired-poster.png",
    type: "series",
    genre: ["Crime", "Drama", "Thriller"],
    year: 2017,
    rating: "TV-MA",
    duration: "5 Seasons",
    description:
      "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.",
    isPopular: true,
    isOriginal: true,
    language: "Spanish",
  },
  // Movies
  {
    id: "13",
    title: "Extraction",
    image: "/extraction-movie-poster.jpg",
    type: "movie",
    genre: ["Action", "Thriller"],
    year: 2020,
    rating: "R",
    duration: "116 min",
    description:
      "A black-market mercenary who has nothing to lose is hired to rescue the kidnapped son of an imprisoned international crime lord.",
    isOriginal: true,
    language: "English",
  },
  {
    id: "14",
    title: "The Old Guard",
    image: "/the-old-guard-poster.jpg",
    type: "movie",
    genre: ["Action", "Fantasy"],
    year: 2020,
    rating: "R",
    duration: "125 min",
    description:
      "A covert team of immortal mercenaries are suddenly exposed and must now fight to keep their identity a secret.",
    isOriginal: true,
    language: "English",
  },
  {
    id: "15",
    title: "6 Underground",
    image: "/6-underground-poster.jpg",
    type: "movie",
    genre: ["Action", "Thriller"],
    year: 2019,
    rating: "R",
    duration: "128 min",
    description:
      "Six individuals from all around the globe, each the very best at what they do, have been chosen not only for their skill, but for a unique desire to delete their pasts to change the future.",
    isOriginal: true,
    language: "English",
  },
  {
    id: "16",
    title: "Red Notice",
    image: "/red-notice-poster.jpg",
    type: "movie",
    genre: ["Action", "Comedy", "Crime"],
    year: 2021,
    rating: "PG-13",
    duration: "118 min",
    description: "An Interpol agent tracks the world's most wanted art thief.",
    isNew: true,
    isOriginal: true,
    language: "English",
  },
]

export const getContentByCategory = (category: string): ContentItem[] => {
  switch (category) {
    case "Home":
      return allContent
    case "TV Shows":
      return allContent.filter((item) => item.type === "series")
    case "Movies":
      return allContent.filter((item) => item.type === "movie")
    case "New & Popular":
      return allContent.filter((item) => item.isNew || item.isPopular)
    case "My List":
      // This would typically come from user data
      return allContent.slice(0, 3)
    case "Browse by Languages":
      return allContent
    default:
      return allContent
  }
}

export const searchContent = (query: string): ContentItem[] => {
  if (!query.trim()) return []

  const lowercaseQuery = query.toLowerCase()
  return allContent.filter(
    (item) =>
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.genre.some((g) => g.toLowerCase().includes(lowercaseQuery)) ||
      item.description.toLowerCase().includes(lowercaseQuery),
  )
}

export const getCarouselData = (category = "Home") => {
  const content = getContentByCategory(category)

  const carousels = [
    {
      title: "Trending Now",
      items: content.filter((item) => item.isPopular).slice(0, 6),
    },
    {
      title: "Netflix Originals",
      items: content.filter((item) => item.isOriginal).slice(0, 6),
    },
    {
      title: "Action & Adventure",
      items: content.filter((item) => item.genre.includes("Action")).slice(0, 6),
    },
    {
      title: "Drama",
      items: content.filter((item) => item.genre.includes("Drama")).slice(0, 6),
    },
  ]

  return carousels.filter((carousel) => carousel.items.length > 0)
}
