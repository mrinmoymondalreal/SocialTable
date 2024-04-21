"use client";

import { useState } from "react";

export default function FollowButton({ isfollowing: _f }: { isfollowing: boolean }){

  let [isfollowing, setFollowing] = useState(_f);

  return (
    <button type="submit" 
    onClick={()=>{
      setFollowing(c=>!c);
    }} className="text-primary border border-primary rounded-md px-4">
      {!isfollowing ? "Follow" : "following"}
    </button>)
}