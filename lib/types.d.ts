export type User = {
  email: string;
  email_verified: boolean;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
};

export type UserToken = User & {
  exp: number
};