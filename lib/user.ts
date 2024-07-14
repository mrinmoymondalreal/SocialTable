import { getServerSession } from "next-auth";
import { sql } from "@vercel/postgres";
import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async session({ session, token }){
      let user = session.user;
      try{
        if(user){
          let resp = await sql`INSERT INTO "users"(name, email, username, picture)
          VALUES (${user.name}, ${user.email}, ${user.email?.split("@")[0]}, ${user.image})
          ON CONFLICT (username) DO UPDATE
          SET name = EXCLUDED.name,
          picture = EXCLUDED.picture
          RETURNING *`;
  
          return {
            ...session,
            user: {
              ...session.user,
              followers: resp.rows[0].followers,
              following: resp.rows[0].following,
              posts: resp.rows[0].posts,
              id: resp.rows[0].user_id,
              username: resp.rows[0].username
            }
          };
        } 
      }catch(err){
        console.log(err);
        return session;
      }

      return session;
    }
  }
}

export const getNextServerSession = () => getServerSession(authOptions);
