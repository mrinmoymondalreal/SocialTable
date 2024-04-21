"use client";

import { UploadButton, UploadDropzone } from "@/lib/utils";
import { useState } from "react";
import { createPost } from "../actions";

 
 
export default function Home() {

  let [picture_url, setPictureUrl] = useState<null | string>(null);
  let [isUploadStarted, setUpload] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="space-y-2">
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            setPictureUrl(res[0].url);
          }}
          onBeforeUploadBegin={(res)=>{
            setUpload(true);
            return res;
          }}
          appearance={{
            button:
              "ut-ready:bg-green-500 ut-uploading:cursor-not-allowed rounded-r-none bg-red-500 bg-none after:bg-orange-400",
            allowedContent:
              "flex h-8 flex-col items-center justify-center px-2 text-white",
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
        <form className="flex flex-col space-y-2" action={createPost}>
          <input type="text" name="content" className="w-full placeholder:text-gray-500 outline-none px-4 py-2 rounded-md bg-black/40" placeholder="Add Caption here" />
          <input type="hidden" name="picture_url" value={picture_url || ""} />
          <button type="submit" className="border border-gray-700 px-4 py-2 rounded-md bg-black/40" onClick={(e)=>{
            if(!isUploadStarted){
              e.preventDefault();
              alert("please choose a picture and click upload");
            }else if(picture_url == null){
              e.preventDefault();
              alert("please wait until the picture uploads!!");
            }
          }}>Post</button>
        </form>
      </div> 
    </main>
  );
}