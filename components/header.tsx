"use client";

import { User } from "@/lib/types";
import { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header({ session }: { session: Session | null }) {
  let { data, status, update } = useSession();

  let extra = data?.user as User;

  return (
    <>
      <div
        id="header"
        className="w-full h-[44px] 
    flex items-center
    border-b border-gray-800 dark:border-gray-400"
      >
        <div className="flex-shrink-0 ml-4 flex justify-center items-center">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img src={session?.user?.image ?? ""} alt="" />
          </div>
        </div>

        <div className="flex-grow flex-1 flex ml-4 md:justify-center items-center">
          <div className="text-primary">
            <Link href="/">SocialTable</Link>
          </div>
          &nbsp;|&nbsp;
          <div className="group">
            {session?.user ? (
              <Link
                href={"/user/" + session?.user?.email}
                className="md:text-base text-xs"
              >
                {session?.user?.name}
              </Link>
            ) : (
              "Welcome"
            )}
            {extra && (
              <div
                className="absolute w-fit p-2 bg-[#262626] 
          border-2 border-white 
          mt-4 shadow-lg rounded-md
          hidden
          -translate-x-1/2 group-hover:flex "
              >
                {extra.followers} Followers | {extra.following} Following |{" "}
                {extra.posts} Posts
              </div>
            )}
          </div>
        </div>

        <div className="flex-shrink mr-4 flex items-center space-x-2">
          <Link
            href="/search"
            className="dark:text-white border dark:border-white rounded-md px-2"
          >
            Search
          </Link>
          {session?.user ? (
            <button type="button" onClick={() => signOut()}>
              SignOut
            </button>
          ) : (
            <button type="button" onClick={() => signIn()}>
              SignIn
            </button>
          )}
        </div>
      </div>
      {session?.user && (
        <Link
          href="/upload"
          className="fixed z-50 bottom-0 right-0 w-12 md:w-16 h-12 md:h-16 bg-primary text-white p-2 rounded-full mb-4 mr-4"
        >
          <img src="/uploadbtn.svg" alt="" />
        </Link>
      )}
    </>
  );
}
