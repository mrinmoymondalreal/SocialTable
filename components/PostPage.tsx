"use client";

import { AddComment } from "@/app/actions";
import Post from "./Post";
import { CommentType, PostType, User } from "@/lib/types";
import { useEffect, useRef, useState } from "react";

type PostPageProps = {
  post?: PostType | null;
  comments?: CommentType[] | null;
  self?: User | null;
  post_id?: string;
}

export default function PostPage({ post, comments: _comments, self, post_id }: PostPageProps){

  let [no_of_comments, setCommentsNos] = useState(post?.comments as number);
  let [comments, setComments] = useState(_comments);

  let commentRef = useRef<HTMLInputElement>(null);

  return (
  <main className="mt-4 flex flex-col items-center gap-y-4 px-4">
      {
        !self ? "Please Sign In first" : post ? <>
          <div className="feed space-y-3">
            {
              [post].map(({ post_image, post_id, content, likes, picture, username, created_at, is_liked })=>
                <Post
                  name={username}
                  caption={content}
                  noComment={no_of_comments}
                  noLike={likes}
                  liked={is_liked}
                  postImage={post_image}
                  time={new Date(created_at).getTime()}
                  index={0}
                  id={post_id}
                  key={post_id}
                  picture={picture}
                />
              )
            }
            <form action={AddComment} className="flex space-x-2">
              <input type="text" ref={commentRef} name="comment" className="w-full placeholder:text-gray-500 outline-none px-4 py-2 rounded-md bg-black/40" placeholder="Write comment here..." />
              <input type="hidden" name="post_id" defaultValue={post_id} />
              <button type="submit" onClick={()=>{
                setComments(c=>[{ username: self.name, picture: self.picture, content: commentRef.current?.value }, ...(c as CommentType[])] as CommentType[]);
                setCommentsNos(c=>(c as number)+1);
              }} className="border border-gray-700 px-4 py-2 rounded-md bg-black/40">Comment</button>
            </form>

            <div className="mb-8 space-y-4">
              { comments && Array.isArray(comments) && comments.map(({ picture, username, content }, i) => (
                <div className="comment flex items-center space-x-4" key={i}>
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img src={picture} className="w-full max-w-full" alt={username+"'s comment"} />
                  </div>
                  <div className="info">
                    <div className="username text-primary">{username}</div>
                    <div className="content">{content}</div>
                  </div>
                </div>
              ))
            }
            </div>
          </div>
        </> : "No Post found"
      }
    </main>
  );
}