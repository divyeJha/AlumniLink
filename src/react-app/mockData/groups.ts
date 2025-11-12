import { Group } from "../../shared/types";

export const mockGroups: Group[] = [
  {
    id: "1",
    name: "Stanford Computer Science Alumni",
    description: "A community for Stanford CS graduates to share opportunities, discuss tech trends, and maintain connections.",
    memberCount: 1247,
    members: ["1", "2", "4"],
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=400&fit=crop",
    isPrivate: false
  },
  {
    id: "2",
    name: "Stanford Entrepreneurs Network",
    description: "Connecting Stanford alumni who are building companies, seeking co-founders, or interested in the startup ecosystem.",
    memberCount: 892,
    members: ["6", "3"],
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop",
    isPrivate: false
  },
  {
    id: "3",
    name: "Stanford Women in Leadership",
    description: "Supporting and empowering Stanford women across all industries through mentorship and networking.",
    memberCount: 634,
    members: ["1", "3", "5"],
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=400&fit=crop",
    isPrivate: false
  },
  {
    id: "4",
    name: "Stanford Bay Area Chapter",
    description: "Local chapter for Stanford alumni living and working in the San Francisco Bay Area.",
    memberCount: 2156,
    members: ["1", "2", "4", "5", "6"],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    isPrivate: false
  },
  {
    id: "5",
    name: "Stanford Design Collective",
    description: "A creative community for Stanford alumni working in design, UX, and creative fields.",
    memberCount: 287,
    members: ["5"],
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=400&fit=crop",
    isPrivate: true
  }
];
