'use client';

import { User } from "@/lib/types";
import { Metadata } from "next";
import Link from "next/link";
import { useRef, useState } from "react";

export default function Page(){
  let [searchResult, setResult] = useState<User[] | null>(null);
  let [isLoading, setLoading] = useState<boolean>(false);
  let SearchRef = useRef<HTMLInputElement>(null);

  return (
    <main className="mt-4 flex flex-col items-center gap-y-4 px-4">
      <form className="flex space-x-2" onSubmit={(e)=>{
        e.preventDefault();
        setLoading(true);
        let q = SearchRef.current?.value;
        fetch('/api/search?q='+q, {
        }).then(e=>e.json()).then(e=>{
          setResult(e as User[]);
          setLoading(false);
        }).catch((err)=>console.log(err));
      }}>
        <input type="text" ref={SearchRef} name="search" className="w-full placeholder:text-gray-500 outline-none px-4 py-2 rounded-md bg-black/40" placeholder="Search Here..." />
        <button type="submit" className="border border-gray-700 px-4 py-2 rounded-md bg-black/40">Search</button>
      </form>
      <div className="heading text-3xl space-y-4">Search Result</div>
      {(isLoading && "Loading...") || (searchResult && searchResult.length > 0 && searchResult.map(user=>(
        <div>
          <div className="flex w-full space-x-4 items-start">
            <div className="image w-16 aspect-square overflow-hidden rounded-full">
                <img src={user.picture} alt="" />
            </div>
            <div>
              <p className="name">{user.name}</p>
              <div className="username">{user.username}</div>
            </div>
            <div>
              <Link href={'user/'+user.username} className="text-primary border border-primary rounded-md px-4">View</Link>
            </div>
          </div>
          <div className="w-[90%] h-px top-2 dark:bg-white/15 relative left-1/2 -translate-x-1/2"></div>
        </div>
      ))) || searchResult != null && "No User found"}
    </main>
  );
}