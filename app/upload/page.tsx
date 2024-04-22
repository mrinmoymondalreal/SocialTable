"use client";

import { useRef, useState } from "react";
import { createPost } from "../actions";
import CustomUploader from "@/components/CustomUploader";
 
export default function Home() {

  let [isUploadStarted, setUpload] = useState(false);
  let formRef = useRef<HTMLFormElement>(null);

  async function uploadPost(picture: string, err: boolean){
    if(err) {setUpload(false); return;}
    let formData = new FormData(formRef.current!);
    await createPost(formData, picture);
  }
    
  let [upload,]  = useState<any>({
    initUploadPost: uploadPost
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="space-y-2">
        <CustomUploader upload={upload} />
        <form ref={formRef} className="flex flex-col space-y-2" >
          <input type="text" name="content" className="w-full placeholder:text-gray-500 outline-none px-4 py-2 rounded-md bg-black/40" placeholder="Add Caption here" />
          <input type="hidden" name="picture_url" />
          <button type="submit" disabled={isUploadStarted} className="border border-gray-700 px-4 py-2 rounded-md bg-black/40" onClick={(e)=>{
            e.preventDefault();
            setUpload(true);
            if(upload.startUpload) upload.startUpload();
          }}>{ isUploadStarted ? "Posting" : "Post" }</button>
        </form>
      </div> 
    </main>
  );
}