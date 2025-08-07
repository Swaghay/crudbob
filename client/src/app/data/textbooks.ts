export interface Textbook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  price: number;
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  course: string;
  seller: string;
  image?: string;
  description: string;
  edition: string;
}

export const dummyTextbooks: Textbook[] = [
  {
    id: '1',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    isbn: '978-0262033848',
    price: 75,
    condition: 'good',
    course: 'CSCI 5421',
    seller: 'Alex Johnson',
    description: 'Comprehensive introduction to algorithms. Great for computer science students.',
    edition: '3rd Edition'
  },
  {
    id: '2',
    title: 'Organic Chemistry',
    author: 'David R. Klein',
    isbn: '978-1118452288',
    price: 120,
    condition: 'like-new',
    course: 'CHEM 2301',
    seller: 'Sarah Chen',
    description: 'Excellent condition, barely used. All chapters intact.',
    edition: '4th Edition'
  },
  {
    id: '3',
    title: 'Calculus: Early Transcendentals',
    author: 'James Stewart',
    isbn: '978-1285741550',
    price: 90,
    condition: 'good',
    course: 'MATH 1271',
    seller: 'Mike Rodriguez',
    description: 'Used for Calc I and II. Some highlighting but all pages present.',
    edition: '8th Edition'
  },
  {
    id: '4',
    title: 'Psychology: The Science of Mind and Behaviour',
    author: 'Michael W. Passer',
    isbn: '978-0077861872',
    price: 65,
    condition: 'fair',
    course: 'PSYC 1001',
    seller: 'Emma Davis',
    description: 'Good study material, some wear on cover but text is readable.',
    edition: '5th Edition'
  },
  {
    id: '5',
    title: 'Principles of Economics',
    author: 'N. Gregory Mankiw',
    isbn: '978-1305585126',
    price: 85,
    condition: 'good',
    course: 'ECON 1101',
    seller: 'David Park',
    description: 'Great intro to economics. Minor highlighting throughout.',
    edition: '8th Edition'
  },
  {
    id: '6',
    title: 'Campbell Biology',
    author: 'Jane B. Reece',
    isbn: '978-0134093413',
    price: 200,
    condition: 'new',
    course: 'BIOL 1009',
    seller: 'Jessica Liu',
    description: 'Brand new, never opened. Still in shrink wrap.',
    edition: '11th Edition'
  },
  {
    id: '7',
    title: 'University Physics with Modern Physics',
    author: 'Hugh D. Young',
    isbn: '978-0133977981',
    price: 110,
    condition: 'good',
    course: 'PHYS 1301',
    seller: 'Tom Anderson',
    description: 'Comprehensive physics textbook. Some notes in margins.',
    edition: '14th Edition'
  },
  {
    id: '8',
    title: 'The Elements of Statistical Learning',
    author: 'Trevor Hastie',
    isbn: '978-0387848570',
    price: 95,
    condition: 'like-new',
    course: 'STAT 5421',
    seller: 'Lisa Wang',
    description: 'Advanced statistics and machine learning. Excellent condition.',
    edition: '2nd Edition'
  }
];