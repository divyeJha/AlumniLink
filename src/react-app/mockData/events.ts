import { Event } from "../../shared/types";

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Stanford Alumni Tech Mixer 2024",
    description: "Join fellow Stanford alumni working in tech for an evening of networking, sharing experiences, and building connections. Light refreshments will be provided.",
    date: "2024-11-25",
    time: "18:00",
    location: "Pier 27, San Francisco",
    isOnline: false,
    organizer: "Stanford Alumni Association",
    attendees: ["1", "2", "4", "5"],
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=400&fit=crop"
  },
  {
    id: "2",
    title: "Virtual Career Panel: From Stanford to Startup Success",
    description: "Hear from successful Stanford alumni entrepreneurs about their journey from campus to building successful companies. Q&A session included.",
    date: "2024-12-05",
    time: "19:00",
    location: "Online - Zoom",
    isOnline: true,
    organizer: "Stanford Entrepreneurship Club",
    attendees: ["3", "6"],
    image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&h=400&fit=crop"
  },
  {
    id: "3",
    title: "Stanford Women in Tech Mentorship Program Launch",
    description: "Launching our new mentorship program connecting recent graduates with experienced professionals. Open to all Stanford women in technology.",
    date: "2024-12-15",
    time: "17:30",
    location: "Stanford Campus - Alumni Center",
    isOnline: false,
    organizer: "Stanford Women in Tech",
    attendees: ["1", "3", "5"],
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=400&fit=crop"
  }
];
