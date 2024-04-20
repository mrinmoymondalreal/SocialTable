import PerformLogin from "@/components/PerformLogin";
import Post from "@/components/Post";
import { PostType, User } from "@/lib/types";
import { isUserLoggedIn } from "@/lib/user";
import { sql } from '@vercel/postgres';

async function getPosts(id?: number, my_id?: number, limit = 6, offset = 0): Promise<PostType[] | null>{
  if(!id) return null;
  try{
    let resp = await sql`SELECT posts.*, users.username, users.picture,
    CASE WHEN likes.like_id IS NOT NULL THEN true ELSE false END AS is_liked
    FROM posts
    JOIN users ON posts.user_id = users.user_id
    LEFT JOIN likes ON posts.post_id = likes.post_id AND likes.user_id = ${my_id}
    WHERE users.user_id = ${id}
    LIMIT ${limit} OFFSET ${offset};
    `;

    return resp.rows as PostType[];
  } catch (error) {
    console.log(error);
    return null; 
  }
}

async function getUser(username: string): Promise<User>{
  let resp = await sql`SELECT * FROM users WHERE username = ${username} LIMIT 1`;
  if(resp.rows[0]){
    resp.rows[0].id = resp.rows[0].user_id;
  }
  return resp.rows[0] as User;
}

export default async function Page({ params }: { params: { username: string } }) {

  let user = await getUser(params.username);
  let self = user && await isUserLoggedIn();
  let posts = user && await getPosts(user.id, self?.id);

  return (
    <main className="mt-4 flex flex-col items-center gap-y-4 px-4">
      {
        !self ? "Please Sign In first" : user ? <>
          <div className="user_info">
            <div className="flex w-full space-x-4 items-center">
              <div className="image w-24 aspect-square overflow-hidden rounded-full">
                  <img src={user.picture} alt="" />
                  fdklfdjkl
              </div>
              <div>
                <p className="name">{user.name} | {user.posts} Post</p>
                <div className="username">{user.username}</div>
                <div className="follow">{user.followers} Followers | {user.following} Following</div>
              </div>
            </div>
          </div>
          <div className="heading text-3xl">Post</div>
          <div className="feed space-y-3">
            {posts && posts?.map(({ post_image, post_id, content, comments, likes, picture, username, created_at, is_liked }, i)=><Post
              name={user.username}
              caption={content}
              noComment={comments}
              noLike={likes}
              liked={is_liked}
              time={new Date(created_at).getTime()}
              index={i}
              key={i}
              id={post_id}
              picture={user.picture}
              postImage={post_image}
            />)}
          </div>
        </> : "No Profile found with this username"
      }
    </main>
  );
}
