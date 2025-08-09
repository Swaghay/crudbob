export interface UserBase {
  username: string;
  email: string;
}

export interface UserWithID extends UserBase {
  user_id: number;
}

export interface UserCreateUpdate {
  username?: string;
  email?: string;
  password?: string;  
}