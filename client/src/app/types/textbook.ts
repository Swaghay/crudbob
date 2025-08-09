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

export interface ListingCreate {
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
