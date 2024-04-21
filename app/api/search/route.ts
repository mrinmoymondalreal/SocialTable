import { User } from "@/lib/types";
import { sql } from "@vercel/postgres";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest){
  const searchParams = request.nextUrl.searchParams;
  let q = searchParams.get('q');

  return new Response(JSON.stringify((await sql`SELECT picture, username, name, user_id
  FROM users
  WHERE LOWER(username) LIKE LOWER('%' || ${q} || '%')
     OR LOWER(name) LIKE LOWER('%' || ${q} || '%');`).rows as User[]));
}