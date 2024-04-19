"use client";

import { useRouter } from "next/navigation";

export default function Logout(){
  let router = useRouter();
  return (
    <button onClick={async ()=>{
      let resp = await fetch("/api/auth?logout=true");
      if(resp.ok) router.refresh(); 
    }}>Logout</button>
  );
}