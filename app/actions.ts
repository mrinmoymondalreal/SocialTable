'use server'

import { isUserLoggedIn } from "@/lib/user"
import { sql } from '@vercel/postgres';

function stringToBool(str: string): boolean{
  return str.toLowerCase() == 'true' ? true : false;
}

export async function Addlike(formData: FormData) {
  let isLike: boolean = !stringToBool(formData.get('islike')?.toString()!), post_id: number = Number(formData.get('post_id'));
  let user = await  isUserLoggedIn();
  if(user && user.id){
    if(isLike){
      let r = await sql`INSERT INTO likes (post_id, user_id)
      VALUES (${post_id}, ${user.id})
      ON CONFLICT (post_id, user_id) DO NOTHING
      RETURNING like_id;`;
  
      if((r.rows as {id:number}[])[0] && (r.rows as {like_id:number}[])[0].like_id){
        await sql`UPDATE posts
        SET likes = likes + 1
        WHERE posts.post_id = ${post_id}`;
      }
    }else{
      await sql`DELETE FROM likes
      WHERE post_id = ${post_id} AND user_id = ${user.id};`;
      await sql`UPDATE posts
      SET likes = CASE
                     WHEN likes - 1 < 0 THEN 0
                     ELSE likes - 1
                  END
      WHERE post_id = ${post_id}`;
    }
  }
}