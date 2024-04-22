// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import { useUploadThing } from "@/lib/utils";
import { useDropzone } from "@uploadthing/react";
import { useCallback, useEffect, useState } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import Dropzone from 'react-dropzone';
import FilesDragAndDrop from '@yelysei/react-files-drag-and-drop';
 
 
export default function CustomUploader({ upload }: { upload: any }) {

  let [imgSrc, setSrc] = useState<null | string>(null);
  let [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo } = useUploadThing(
    "imageUploader",
    {
      onClientUploadComplete: (k) => {
        upload.initUploadPost(k[0].url);
      },
      onUploadError: () => {
        alert("error occurred while uploading");
        upload.initUploadPost(null, true);
      },
      onUploadBegin: () => {
        console.log("upload has begun");
      },
    },
  );

  upload.startUpload = startUpload.bind(null, files);

  return (
    <FilesDragAndDrop
      onUpload={(files) => {
        let selectedFile = files[0];
        onDrop([selectedFile]);
        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = () => {
          const blob = new Blob([reader.result!], { type: selectedFile.type });
          setSrc(URL.createObjectURL(blob))
        };
      }}
      count={1}
      formats={['jpg', 'png']}
      containerStyles={{
          minWidth: '300px',
          height: '300px',
          borderRadius: "6px",
          border: '1px solid #cccccc',
      }}
      openDialogOnClick 
      successText="Added Successfully"
      hoverText={"Drop like it's hot !! 🔥"}
      errorFormatText={"Oops we don't support this format"}>
     { 
      !!imgSrc ? 
      <div className="relative w-full h-full flex justify-center flex-col items-center p-2 space-y-2">
        <img src={imgSrc} className="max-w-full max-h-[200px]" alt="" />
        <div className="p-1 rounded-md">Click or Drag and Drop Image to Select another</div>
      </div>
      :
      <div className="text-2xl font-bold" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%'
      }}>
          Drop files here
      </div>
    }
  </FilesDragAndDrop>
  );
}