import Post from "@/components/Post";
import { PostType, User } from "@/lib/types";
import { isUserLoggedIn } from "@/lib/user";
import { sql } from '@vercel/postgres';

async function getPost(id?: string, my_id?: number): Promise<PostType | null>{
  if(!id) return null;
  try{
    let resp = await sql`SELECT posts.*, users.username, users.picture,
    CASE WHEN likes.like_id IS NOT NULL THEN true ELSE false END AS is_liked
    FROM posts
    JOIN users ON posts.user_id = users.user_id
    LEFT JOIN likes ON posts.post_id = likes.post_id AND likes.user_id = ${my_id}
    WHERE users.user_id = ${id}
    LIMIT 1
    `;
    return resp.rows[0] as PostType;
  } catch (error) {
    console.log(error);
    return null; 
  }
}

export default async function Page({ params }: { params: { post_id: string } }) {

  let self = await isUserLoggedIn();
  let post = await getPost(params.post_id, self?.id);
  let { post_image, post_id, content, comments, likes, picture, username, created_at, is_liked } = post as PostType;

  return (
    <main className="mt-4 flex flex-col items-center gap-y-4 px-4">
      {
        !self ? "Please Sign In first" : post ? <>
          <div className="feed space-y-3">
            <Post
              name={username}
              caption={content}
              noComment={comments}
              noLike={likes}
              liked={is_liked}
              postImage={post_image}
              time={new Date(created_at).getTime()}
              index={0}
              id={post_id}
              picture={picture}
            />
          </div>
        </> : "No Profile found with this username"
      }
    </main>
  );
}
