import { Post } from "../../shared/types";

export const mockPosts: Post[] = [
  {
    id: "1",
    authorId: "2",
    content: "Excited to announce that our team at Google just launched a new cloud infrastructure feature! It's amazing what we can achieve when we work together. Looking forward to connecting with more Stanford alumni working in tech.",
    timestamp: "2024-11-10T14:30:00Z",
    likes: ["1", "3", "5"],
    comments: [
      {
        id: "c1",
        authorId: "1",
        content: "Congratulations Michael! Would love to learn more about this.",
        timestamp: "2024-11-10T15:00:00Z"
      }
    ]
  },
  {
    id: "2",
    authorId: "3",
    content: "Just wrapped up an incredible marketing campaign that increased user engagement by 40%! The power of data-driven storytelling never ceases to amaze me. Any fellow Stanford alumni in marketing want to share insights?",
    timestamp: "2024-11-10T12:15:00Z",
    likes: ["1", "2", "4"],
    comments: []
  },
  {
    id: "3",
    authorId: "5",
    content: "Working on some exciting UX projects at Airbnb. The intersection of design and technology continues to evolve rapidly. Would love to connect with other designers from our alma mater!",
    timestamp: "2024-11-10T09:45:00Z",
    likes: ["1", "6"],
    comments: [
      {
        id: "c2",
        authorId: "1",
        content: "Your design work is always inspiring Jessica!",
        timestamp: "2024-11-10T10:00:00Z"
      }
    ]
  },
  {
    id: "4",
    authorId: "6",
    content: "Thrilled to share that GreenTech Solutions just secured Series A funding! We're building the future of sustainable energy. Always grateful for the entrepreneurship foundation I got at Stanford.",
    timestamp: "2024-11-09T16:20:00Z",
    likes: ["1", "2", "3", "4", "5"],
    comments: [
      {
        id: "c3",
        authorId: "2",
        content: "Congratulations Robert! This is huge news.",
        timestamp: "2024-11-09T17:00:00Z"
      },
      {
        id: "c4",
        authorId: "1",
        content: "So proud of what you've built!",
        timestamp: "2024-11-09T18:30:00Z"
      }
    ]
  }
];
