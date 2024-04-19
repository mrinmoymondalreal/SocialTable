import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { User, UserToken } from "./types";

export async function isUserLoggedIn(): Promise<User | null>{
  let jwt = cookies().get('token');
  if(jwt && jwt.value){
    let user: UserToken = jwtDecode(jwt.value)
    if(user && new Date(user.exp*1000).getTime() > new Date().getTime()){
      return user;
    }
  }
  return null;
}