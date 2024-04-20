import PerformLogin from "@/components/PerformLogin";
import Post from "@/components/Post";
import { PostType } from "@/lib/types";
import { isUserLoggedIn } from "@/lib/user";
import { sql } from '@vercel/postgres';

async function getPosts(id?: number, limit = 6, offset = 0): Promise<PostType[] | null>{
  if(!id) return null;
  try{
    let resp = await sql`SELECT posts.*, users.username, users.picture,
    CASE WHEN likes.like_id IS NOT NULL THEN true ELSE false END AS is_liked
    FROM posts
    JOIN users ON posts.user_id = users.user_id
    LEFT JOIN likes ON posts.post_id = likes.post_id AND likes.user_id = ${id}
    WHERE users.user_id = ${id}

    UNION

    SELECT posts.*, users.username, users.picture,
        CASE WHEN likes.like_id IS NOT NULL THEN true ELSE false END AS is_liked
    FROM posts
    JOIN user_relationships ON posts.user_id = user_relationships.following_id
    JOIN users ON user_relationships.following_id = users.user_id
    LEFT JOIN likes ON posts.post_id = likes.post_id AND likes.user_id = ${id}
    WHERE user_relationships.follower_id = ${id}
    LIMIT ${limit} OFFSET ${offset};
    `;

    return resp.rows as PostType[];
  } catch (error) {
    console.log(error);
    return null; 
  }
}

export default async function Home() {
  let user = await isUserLoggedIn();
  let posts = await getPosts(user?.id);
  return (
    <main className="mt-4 flex flex-col items-center gap-y-4 px-4">
      { 
        !user ? <PerformLogin />
        :
        <>
        <div className="heading text-3xl">your feed</div>
        <div className="feed space-y-3">
          {posts && posts?.map(({ post_image, post_id, content, comments, likes, picture, username, created_at, is_liked }, i)=><Post
            name={username}
            caption={content}
            noComment={comments}
            noLike={likes}
            liked={is_liked}
            time={new Date(created_at).getTime()}
            index={i}
            key={i}
            id={post_id}
            postImage={post_image}
            picture={picture}
          />)}
        </div>
        </>
      }
    </main>
  );
}
