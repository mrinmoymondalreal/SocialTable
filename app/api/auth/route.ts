import { NextRequest, NextResponse } from "next/server";
import { sql } from '@vercel/postgres';
import { jwtDecode } from "jwt-decode";
import { User } from "@/lib/types";
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest){
  const searchParams = request.nextUrl.searchParams;
  let response = new NextResponse();
  if(searchParams.get('logout') == 'true'){
    response.cookies.set('token', '');
    return response;
  }
  try{
    let user: User = jwtDecode(searchParams.get('idToken') || "")
    let resp = await sql`INSERT INTO "users"(name, email, username, picture)
    VALUES (${user.name}, ${user.email}, ${user.email.split("@")[0]}, ${user.picture})
    ON CONFLICT (username) DO UPDATE
    SET name = EXCLUDED.name,
        picture = EXCLUDED.picture
    RETURNING *`;
    user.followers = resp.rows[0].followers;
    user.following = resp.rows[0].following;
    user.posts = resp.rows[0].posts;
    user.id = resp.rows[0].user_id;
    user.username = resp.rows[0].username;
    let jwtToken = jwt.sign(user, process.env.JWT_SECERT!);
    response.cookies.set('token', jwtToken);
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 }); 
  }
}