export type Gender = '남' | '여';

export type Region =
  | '서울' | '경기' | '인천' | '부산' | '대구' | '대전'
  | '광주' | '울산' | '세종' | '강원' | '충북' | '충남'
  | '전북' | '전남' | '경북' | '경남' | '제주';

export type Personality =
  | '활발한' | '조용한' | '다정한' | '츤데레' | '애교많은'
  | '독립적인' | '감성적인' | '유머있는' | '지적인' | '운동좋아하는';

export interface User {
  id: string;
  name: string;
  age: number;
  bio: string;
  avatar: string;
  gender: Gender;
  region: Region;
  height: number;
  weight: number;
  personalities: Personality[];
  hideHeight: boolean;
  hideWeight: boolean;
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
  targetGender: Gender;
  region: Region;
  minHeight?: number;
  maxHeight?: number;
  minWeight?: number;
  maxWeight?: number;
  personalities: Personality[];
  createdAt: string;
}

export interface JobFilter {
  targetGender: Gender;
  region?: Region;
  minHeight?: number;
  maxHeight?: number;
  minWeight?: number;
  maxWeight?: number;
  personalities: Personality[];
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
