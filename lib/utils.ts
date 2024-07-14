export function timeAgoString(timestamp: number) {
  const now: number = new Date().getTime();
  const then: number = new Date(timestamp).getTime(); // Convert Unix timestamp to milliseconds
  const delta = now - then;
  
    if (delta >= 365 * 24 * 60 * 60 * 1000) {
        const years = Math.floor(delta / (365 * 24 * 60 * 60 * 1000));
        return `${years} year${years > 1 ? 's' : ''} ago`;
    } else if (delta >= 30 * 24 * 60 * 60 * 1000) {
        const months = Math.floor(delta / (30 * 24 * 60 * 60 * 1000));
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (delta >= 24 * 60 * 60 * 1000) {
        const days = Math.floor(delta / (24 * 60 * 60 * 1000));
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (delta >= 60 * 60 * 1000) {
        const hours = Math.floor(delta / (60 * 60 * 1000));
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (delta >= 60 * 1000) {
        const minutes = Math.floor(delta / (60 * 1000));
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return "just now";
  }
}

import { OurFileRouter } from "@/app/api/uploadthing/core";
import {
    generateUploadButton,
    generateUploadDropzone,
} from "@uploadthing/react";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

import { generateReactHelpers } from "@uploadthing/react";
 
export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
  