import { User } from "../../shared/types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Divye",
    email: "divye@email.com",
    profilePicture: "https://mocha-cdn.com/019a6f3d-4b97-7d75-8cca-93c91e6d8099/WhatsApp-Image-2025-11-11-at-02.31.24_18cb5251.jpg",
    headline: "Blockchain Developer at Meta",
    bio: "Passionate about building scalable web applications and mentoring junior developers. Graduate of Computer Science from Galgotia College of Engineering and technology.",
    college: "Galgotia College of Engineering and technology",
    branch: "Computer Science",
    graduationYear: 2023,
    currentCompany: "Meta",
    location: "San Francisco, CA",
    skills: ["React", "TypeScript", "Node.js", "System Design"],
    connections: ["2", "3", "5"]
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    headline: "Product Manager at Google",
    bio: "Leading product strategy for cloud infrastructure. Alumni of Electrical Engineering from Stanford University.",
    college: "Stanford University",
    branch: "Electrical Engineering",
    graduationYear: 2017,
    currentCompany: "Google",
    location: "Mountain View, CA",
    skills: ["Product Strategy", "Data Analysis", "Leadership", "Machine Learning"],
    connections: ["1", "4", "6"]
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    profilePicture: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    headline: "Marketing Director at Spotify",
    bio: "Driving growth through innovative marketing strategies. Business Administration graduate from Stanford University.",
    college: "Stanford University",
    branch: "Business Administration",
    graduationYear: 2019,
    currentCompany: "Spotify",
    location: "New York, NY",
    skills: ["Digital Marketing", "Brand Strategy", "Analytics", "Growth Hacking"],
    connections: ["1", "7", "8"]
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@email.com",
    profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    headline: "Data Scientist at Netflix",
    bio: "Building recommendation systems and analyzing user behavior patterns. Statistics major from Stanford University.",
    college: "Stanford University",
    branch: "Statistics",
    graduationYear: 2020,
    currentCompany: "Netflix",
    location: "Los Gatos, CA",
    skills: ["Python", "Machine Learning", "Statistics", "Data Visualization"],
    connections: ["2", "9", "10"]
  },
  {
    id: "5",
    name: "Jessica Wang",
    email: "jessica.wang@email.com",
    profilePicture: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    headline: "UX Designer at Airbnb",
    bio: "Creating delightful user experiences through human-centered design. Design graduate from Stanford University.",
    college: "Stanford University",
    branch: "Design",
    graduationYear: 2021,
    currentCompany: "Airbnb",
    location: "San Francisco, CA",
    skills: ["UX Design", "Prototyping", "User Research", "Figma"],
    connections: ["1", "6", "11"]
  },
  {
    id: "6",
    name: "Robert Thompson",
    email: "robert.thompson@email.com",
    profilePicture: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
    headline: "Startup Founder & CEO",
    bio: "Building the future of sustainable technology. Mechanical Engineering background from Stanford University.",
    college: "Stanford University",
    branch: "Mechanical Engineering",
    graduationYear: 2016,
    currentCompany: "GreenTech Solutions",
    location: "Palo Alto, CA",
    skills: ["Entrepreneurship", "Clean Energy", "Leadership", "Innovation"],
    connections: ["2", "5", "12"]
  }
];

export const getCurrentUser = (): User => mockUsers[0];
