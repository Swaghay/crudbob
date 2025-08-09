export enum ConditionEnum {
  New = 0,
  LikeNew = 1,
  Good = 2,
  Fair = 3,
  Poor = 4,
}

export interface TextbookListing {
  listing_id: number;      
  title: string;
  author: string;
  isbn?: string;            
  edition?: string;         
  course_code: string;      
  price: number;
  condition: ConditionEnum;
  user_id: number;           
  description: string;
  view_count?: number;
  image?: string;           
  seller?: string;
}

export interface ListingUpdate {
  title?: string;
  author?: string;
  isbn?: string;
  edition?: string;
  course_code?: string;
  price?: number;
  condition?: ConditionEnum;
  user_id?: number;
  description?: string;
  view_count?: number;
  image?: string;
  seller?: string;
}

export const dummyTextbooks: TextbookListing[] = [
  {
    listing_id: 1,
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    isbn: '978-0262033848',
    price: 75,
    condition: ConditionEnum.Good,
    course_code: 'CSCI 5421',
    seller: 'Alex Johnson',
    description: 'Comprehensive introduction to algorithms. Great for computer science students.',
    edition: '3rd Edition',
    user_id: 1
  },
  {
    listing_id: 2,
    title: 'Organic Chemistry',
    author: 'David R. Klein',
    isbn: '978-1118452288',
    price: 120,
    condition: ConditionEnum.LikeNew,
    course_code: 'CHEM 2301',
    seller: 'Sarah Chen',
    description: 'Excellent condition, barely used. All chapters intact.',
    edition: '4th Edition',
    user_id: 2
  },
  {
    listing_id: 3,
    title: 'Calculus: Early Transcendentals',
    author: 'James Stewart',
    isbn: '978-1285741550',
    price: 90,
    condition: ConditionEnum.Good,
    course_code: 'MATH 1271',
    seller: 'Mike Rodriguez',
    description: 'Used for Calc I and II. Some highlighting but all pages present.',
    edition: '8th Edition',
    user_id: 3
  },
  {
    listing_id: 4,
    title: 'Psychology: The Science of Mind and Behaviour',
    author: 'Michael W. Passer',
    isbn: '978-0077861872',
    price: 65,
    condition: ConditionEnum.Fair,
    course_code: 'PSYC 1001',
    seller: 'Emma Davis',
    description: 'Good study material, some wear on cover but text is readable.',
    edition: '5th Edition',
    user_id: 4
  },
  {
    listing_id: 5,
    title: 'Principles of Economics',
    author: 'N. Gregory Mankiw',
    isbn: '978-1305585126',
    price: 85,
    condition: ConditionEnum.Good,
    course_code: 'ECON 1101',
    seller: 'David Park',
    description: 'Great intro to economics. Minor highlighting throughout.',
    edition: '8th Edition',
    user_id: 5
  },
  {
    listing_id: 6,
    title: 'Campbell Biology',
    author: 'Jane B. Reece',
    isbn: '978-0134093413',
    price: 200,
    condition: ConditionEnum.New,
    course_code: 'BIOL 1009',
    seller: 'Jessica Liu',
    description: 'Brand new, never opened. Still in shrink wrap.',
    edition: '11th Edition',
    user_id: 6
  },
  {
    listing_id: 7,
    title: 'University Physics with Modern Physics',
    author: 'Hugh D. Young',
    isbn: '978-0133977981',
    price: 110,
    condition: ConditionEnum.Good,
    course_code: 'PHYS 1301',
    seller: 'Tom Anderson',
    description: 'Comprehensive physics textbook. Some notes in margins.',
    edition: '14th Edition',
    user_id: 7
  },
  {
    listing_id: 8,
    title: 'The Elements of Statistical Learning',
    author: 'Trevor Hastie',
    isbn: '978-0387848570',
    price: 95,
    condition: ConditionEnum.LikeNew,
    course_code: 'STAT 5421',
    seller: 'Lisa Wang',
    description: 'Advanced statistics and machine learning. Excellent condition.',
    edition: '2nd Edition',
    user_id: 8
  }
];