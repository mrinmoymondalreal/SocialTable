import { AddComment } from "@/app/actions";
import { getNextServerSession } from "@/app/api/auth/[...nextauth]/route";
import Post from "@/components/Post";
import PostPage from "@/components/PostPage";
import { CommentType, PostType, User } from "@/lib/types";
import { sql } from "@vercel/postgres";
import { Metadata } from "next";

async function getPost(id?: string, my_id?: number): Promise<PostType | null> {
  if (!id) return null;
  try {
    let resp = await sql`SELECT posts.*, users.username, users.picture,
    CASE WHEN likes.like_id IS NOT NULL THEN true ELSE false END AS is_liked
    FROM posts
    JOIN users ON posts.user_id = users.user_id
    LEFT JOIN likes ON posts.post_id = likes.post_id AND likes.user_id = ${my_id}
    WHERE posts.post_id = ${id}
    LIMIT 1
    `;
    return resp.rows[0] as PostType;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getComments(post_id: number) {
  if (!post_id) return null;
  try {
    let resp = await sql`SELECT comments.*, users.username, users.picture
    FROM comments
    JOIN users ON comments.user_id = users.user_id
    WHERE comments.post_id = ${post_id}
    `;
    return resp.rows as CommentType[];
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default async function Page({
  params,
}: {
  params: { post_id: string };
}) {
  let self = (await getNextServerSession())?.user as User;
  let post = await getPost(params.post_id, self?.id);
  let comments = await getComments(Number(params.post_id));

  return (
    <PostPage
      self={self}
      comments={comments}
      post={post}
      post_id={params.post_id}
    />
  );
}

export const metadata: Metadata = {
  title: "Post",
};
