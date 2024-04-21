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

export async function AddComment(formData: FormData) {
  let post_id: number = Number(formData.get('post_id')), comment = formData.get('comment') as string;
  let user = await  isUserLoggedIn();
  if(user && user.id && (comment && comment.trim().length > 0)){
    let r = await sql`INSERT INTO comments (post_id, user_id, content)
    VALUES (${post_id}, ${user.id}, ${comment}) RETURNING comment_id;`;

    if(r.rows[0] && (r.rows as {comment_id:number}[])[0].comment_id){
      await sql`UPDATE posts
      SET comments = comments + 1
      WHERE posts.post_id = ${post_id}`;
    }
    // if(isLike){
    // }else{
    //   // await sql`DELETE FROM likes
    //   // WHERE post_id = ${post_id} AND user_id = ${user.id};`;
    //   // await sql`UPDATE posts
    //   // SET likes = CASE
    //   //                WHEN likes - 1 < 0 THEN 0
    //   //                ELSE likes - 1
    //   //             END
    //   // WHERE post_id = ${post_id}`;
    // }
  }
}


export async function addFollowing(formData: FormData){
  let followed_user_id = formData.get('followed_user_id') as string;
  let user = await  isUserLoggedIn();
  if(user && followed_user_id.trim().length > 0 && !(user.id == Number(followed_user_id))){
    let resp = await sql`INSERT INTO user_relationships (follower_id, following_id) VALUES (${user.id}, ${followed_user_id}) 
    ON CONFLICT (follower_id, following_id) DO NOTHING
    RETURNING relationship_id`;

    if(!resp.rows[0]){
      await sql`DELETE from user_relationships WHERE follower_id = ${user.id} AND following_id = ${followed_user_id}`;
      await sql`UPDATE users
        SET following = following - 1 
        WHERE user_id = ${user.id}`;
    await sql`UPDATE users
        SET followers = followers - 1
        WHERE user_id = ${followed_user_id}`;
      return ;
    }

    await sql`UPDATE users
        SET following = following + 1
        WHERE user_id = ${user.id}`;
    await sql`UPDATE users
        SET followers = followers + 1
        WHERE user_id = ${followed_user_id}`;
  }
}

export async function createPost(formData: FormData){
  let content = formData.get('content') as string;
  let picture = formData.get('picture_url') as string;
  let user = await isUserLoggedIn();

  if(user && picture && content && picture.trim().length > 0){
    // console.log(user, content, picture);
    let resp = await sql`INSERT INTO posts (user_id, content, post_image) VALUES (${user.id}, ${content || ""}, ${picture}) RETURNING post_id`;

    if(resp.rows[0]){
      await sql`UPDATE users
      SET posts = posts + 1
      WHERE user_id = ${user.id}`;
    }
  }
}
