export type User = {
  email: string;
  email_verified: boolean;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  followers: number;
  following: number;
  posts: number;
  id: number;
  username: string;
};

export type UserToken = User & {
  exp: number
};

export type PostType = {
  post_id: number;
  user_id: number;
  content: string ;
  created_at: Date;
  likes:  number;
  comments: number; 
  post_image: string,
  username: string;
  is_liked: boolean;
  picture: string;
}