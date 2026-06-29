import { User, Post, JobPosting, ChatRoom } from '../types';

export const currentUser: User = {
  id: 'me',
  name: '김민준',
  age: 27,
  bio: '스타트업에서 일하는 개발자입니다.',
  avatar: 'https://i.pravatar.cc/150?img=1',
  location: '서울',
  skills: ['React', 'TypeScript', 'Node.js'],
};

export const users: User[] = [
  {
    id: 'u1',
    name: '이서연',
    age: 25,
    bio: 'UX 디자이너로 활동 중입니다. 좋은 프로덕트를 만들고 싶어요.',
    avatar: 'https://i.pravatar.cc/150?img=5',
    location: '서울',
    skills: ['Figma', 'Sketch', 'Prototyping'],
  },
  {
    id: 'u2',
    name: '박준혁',
    age: 29,
    bio: '마케터입니다. 데이터 기반 성장을 좋아합니다.',
    avatar: 'https://i.pravatar.cc/150?img=12',
    location: '판교',
    skills: ['Growth Hacking', 'SQL', 'Analytics'],
  },
  {
    id: 'u3',
    name: '최지은',
    age: 26,
    bio: '백엔드 개발자. Go, Python 주로 씁니다.',
    avatar: 'https://i.pravatar.cc/150?img=9',
    location: '강남',
    skills: ['Go', 'Python', 'AWS'],
  },
  {
    id: 'u4',
    name: '정태양',
    age: 31,
    bio: 'PM으로 B2B SaaS 제품을 개발하고 있습니다.',
    avatar: 'https://i.pravatar.cc/150?img=15',
    location: '판교',
    skills: ['Product Management', 'Agile', 'Jira'],
  },
];

export const posts: Post[] = [
  {
    id: 'p1',
    author: users[0],
    content: '오늘 사이드 프로젝트 첫 배포 완료했습니다! 🎉 3개월의 노력이 드디어 빛을 발하네요.',
    createdAt: '2시간 전',
    likes: 42,
    comments: 8,
    liked: false,
  },
  {
    id: 'p2',
    author: users[1],
    content: 'GA4로 퍼널 분석하다가 엄청난 인사이트 발견 ㅋㅋ 전환율이 이렇게 낮을 줄이야...',
    createdAt: '5시간 전',
    likes: 28,
    comments: 15,
    liked: true,
  },
  {
    id: 'p3',
    author: users[2],
    content: 'Go로 짠 API 서버 성능 테스트 결과 공유합니다. 동시 요청 1만개 처리 시 응답시간 평균 12ms',
    createdAt: '어제',
    likes: 93,
    comments: 21,
    liked: false,
  },
  {
    id: 'p4',
    author: users[3],
    content: '스타트업 PM 1년차 회고를 써봤습니다. 제일 힘들었던 건 우선순위 정하기였어요.',
    createdAt: '어제',
    likes: 67,
    comments: 34,
    liked: false,
  },
];

export const jobPostings: JobPosting[] = [
  {
    id: 'j1',
    author: users[0],
    title: 'iOS/Android 앱 개발 공동창업자 구합니다',
    description: '헬스케어 스타트업을 준비 중입니다. 앱 개발 경험이 있고 같이 성장할 수 있는 분을 찾고 있어요. 지분 제공 예정입니다.',
    requirements: ['React Native 또는 Flutter 경험', '스타트업 마인드셋', '주 10시간 이상 투자 가능'],
    location: '재택/서울',
    createdAt: '1일 전',
    category: '공동창업',
  },
  {
    id: 'j2',
    author: users[1],
    title: '그로스 마케터 파트타임 구합니다',
    description: '에듀테크 초기 스타트업에서 퍼포먼스 마케팅 담당해주실 분을 구합니다. 마케팅 예산 운영 경험 있으신 분 환영합니다.',
    requirements: ['Meta Ads, Google Ads 운영 경험', '데이터 분석 능력', '주 15-20시간'],
    location: '원격',
    salary: '월 150-200만원',
    createdAt: '2일 전',
    category: '파트타임',
  },
  {
    id: 'j3',
    author: users[2],
    title: '백엔드 개발자 사이드 프로젝트 팀원 구합니다',
    description: '중고 거래 플랫폼 사이드 프로젝트입니다. 포트폴리오 목적으로 같이 개발하실 분 구합니다. 완성 후 수익화 계획 있음.',
    requirements: ['Node.js 또는 Python 백엔드', 'DB 설계 경험', '주 5-10시간'],
    location: '온라인',
    createdAt: '3일 전',
    category: '사이드프로젝트',
  },
  {
    id: 'j4',
    author: users[3],
    title: 'UX/UI 디자이너 협업 구합니다',
    description: 'B2B 대시보드 제품의 리디자인을 함께 진행해주실 디자이너를 찾습니다. 포트폴리오로 활용 가능하고 완성 시 사례금 제공.',
    requirements: ['Figma 숙련', 'B2B 프로덕트 이해도', '2-4주 단기 프로젝트'],
    location: '재택',
    salary: '완성 시 30-50만원',
    createdAt: '5일 전',
    category: '단기프로젝트',
  },
];

export const chatRooms: ChatRoom[] = [
  {
    id: 'c1',
    jobPostingId: 'j2',
    jobTitle: '그로스 마케터 파트타임 구합니다',
    otherUser: users[1],
    messages: [
      {
        id: 'm1',
        senderId: 'me',
        text: '안녕하세요! 구인글 보고 연락드립니다. 마케팅 경험이 있어서 관심이 생겼어요.',
        createdAt: '10:30',
      },
      {
        id: 'm2',
        senderId: 'u2',
        text: '안녕하세요! 반갑습니다. 어떤 경험이 있으신지 간단히 말씀해주실 수 있나요?',
        createdAt: '10:35',
      },
    ],
    lastMessage: {
      id: 'm2',
      senderId: 'u2',
      text: '안녕하세요! 반갑습니다. 어떤 경험이 있으신지 간단히 말씀해주실 수 있나요?',
      createdAt: '10:35',
    },
  },
];
