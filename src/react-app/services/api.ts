import { User, Post, Event, Group } from '../../shared/types';
import { mockUsers } from '../mockData/users';
import { mockPosts } from '../mockData/posts';
import { mockEvents } from '../mockData/events';
import { mockGroups } from '../mockData/groups';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // User API
  async fetchUsers(): Promise<User[]> {
    await delay(800);
    return mockUsers;
  },

  async getUserProfile(id: string): Promise<User | null> {
    await delay(500);
    return mockUsers.find(user => user.id === id) || null;
  },

  async searchUsers(query: string, filters?: {
    branch?: string;
    graduationYear?: number;
    location?: string;
  }): Promise<User[]> {
    await delay(600);
    
    let filteredUsers = mockUsers.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.headline.toLowerCase().includes(query.toLowerCase()) ||
      user.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
    );

    if (filters) {
      if (filters.branch) {
        filteredUsers = filteredUsers.filter(user => 
          user.branch.toLowerCase().includes(filters.branch!.toLowerCase())
        );
      }
      if (filters.graduationYear) {
        filteredUsers = filteredUsers.filter(user => 
          user.graduationYear === filters.graduationYear
        );
      }
      if (filters.location) {
        filteredUsers = filteredUsers.filter(user => 
          user.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }
    }

    return filteredUsers;
  },

  // Posts API
  async fetchPosts(): Promise<Post[]> {
    await delay(700);
    return mockPosts.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  },

  async createPost(content: string, authorId: string): Promise<Post> {
    await delay(500);
    
    const newPost: Post = {
      id: Date.now().toString(),
      authorId,
      content,
      timestamp: new Date().toISOString(),
      likes: [],
      comments: []
    };
    
    mockPosts.unshift(newPost);
    return newPost;
  },

  async likePost(postId: string, userId: string): Promise<boolean> {
    await delay(300);
    
    const post = mockPosts.find(p => p.id === postId);
    if (post) {
      const likeIndex = post.likes.indexOf(userId);
      if (likeIndex > -1) {
        post.likes.splice(likeIndex, 1);
      } else {
        post.likes.push(userId);
      }
      return true;
    }
    return false;
  },

  // Events API
  async fetchEvents(): Promise<Event[]> {
    await delay(600);
    return mockEvents.sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  },

  async rsvpEvent(eventId: string, userId: string): Promise<boolean> {
    await delay(400);
    
    const event = mockEvents.find(e => e.id === eventId);
    if (event) {
      const rsvpIndex = event.attendees.indexOf(userId);
      if (rsvpIndex > -1) {
        event.attendees.splice(rsvpIndex, 1);
      } else {
        event.attendees.push(userId);
      }
      return true;
    }
    return false;
  },

  // Groups API
  async fetchGroups(): Promise<Group[]> {
    await delay(500);
    return mockGroups;
  },

  async joinGroup(groupId: string, userId: string): Promise<boolean> {
    await delay(400);
    
    const group = mockGroups.find(g => g.id === groupId);
    if (group && !group.members.includes(userId)) {
      group.members.push(userId);
      group.memberCount++;
      return true;
    }
    return false;
  }
};
