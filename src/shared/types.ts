import z from "zod";

// User types
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  profilePicture: z.string().url(),
  headline: z.string(),
  bio: z.string(),
  college: z.string(),
  branch: z.string(),
  graduationYear: z.number(),
  currentCompany: z.string(),
  location: z.string(),
  skills: z.array(z.string()),
  connections: z.array(z.string()),
});

export type User = z.infer<typeof UserSchema>;

// Post types
export const PostSchema = z.object({
  id: z.string(),
  authorId: z.string(),
  content: z.string(),
  timestamp: z.string(),
  likes: z.array(z.string()),
  comments: z.array(z.object({
    id: z.string(),
    authorId: z.string(),
    content: z.string(),
    timestamp: z.string(),
  })),
});

export type Post = z.infer<typeof PostSchema>;

// Event types
export const EventSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  time: z.string(),
  location: z.string(),
  isOnline: z.boolean(),
  organizer: z.string(),
  attendees: z.array(z.string()),
  image: z.string().url(),
});

export type Event = z.infer<typeof EventSchema>;

// Group types
export const GroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  memberCount: z.number(),
  members: z.array(z.string()),
  image: z.string().url(),
  isPrivate: z.boolean(),
});

export type Group = z.infer<typeof GroupSchema>;
