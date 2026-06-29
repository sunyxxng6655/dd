export interface User {
  id: string;
  name: string;
  age: number;
  bio: string;
  avatar: string;
  location: string;
  skills?: string[];
}

export interface Post {
  id: string;
  author: User;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
  liked: boolean;
}

export interface JobPosting {
  id: string;
  author: User;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  salary?: string;
  createdAt: string;
  category: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  createdAt: string;
}

export interface ChatRoom {
  id: string;
  jobPostingId: string;
  jobTitle: string;
  otherUser: User;
  lastMessage?: Message;
  messages: Message[];
}
