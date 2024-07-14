"use client";

import { Addlike } from "@/app/actions";
import { timeAgoString } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import ImageComponent from "./Image";

type PostProps = {
  name: string;
  time: number;
  liked?: boolean;
  noLike: number;
  noComment: number;
  caption: string;
  index?: number;
  picture: string;
  id: number;
  postImage: string;
};

function ImageFallback() {
  return (
    <div className="max-w-[500px] w-[100%] rounded-md aspect-video bg-black/10 overflow-hidden">
      <div className="rotate-12 w-24 bg-white/10 h-[150%] -translate-y-12 -translate-x-[250%] blur-3xl animate-pos"></div>
    </div>
  );
}

export default function Post({
  name,
  time,
  liked,
  noLike,
  noComment,
  caption,
  index,
  picture,
  id,
  postImage,
}: PostProps) {
  let [isLiked, setLiked] = useState(liked || false);

  noLike -= liked ? 1 : 0;
  noLike = Math.max(noLike, 0);

  let cal_time = timeAgoString(time);

  let rotate = index! % 2 == 0 ? -1 : 1;

  return (
    <div className="feed max-w-[600px] px-2 py-4 space-y-2">
      <div className="flex items-center space-x-2">
        <div className="overflow-hidden rounded-full w-6 h-6">
          <img src={picture} alt={name + "'s Profile Picture"} />
        </div>
        <div className="inline border-b text-primary">
          <Link href={"/user/" + name}>{name}</Link>
        </div>
        &nbsp;posted {cal_time}
      </div>
      <div className="h-fit w-full py-2 box-border">
        <ImageComponent
          fallback={<ImageFallback />}
          src={postImage}
          style={{
            rotate: `${rotate}deg`,
          }}
          className="max-w-full w-[100%] rounded-lg"
          alt={`Posted by ${name} | ${caption}`}
        />
      </div>
      <div className="flex space-x-4 items-center">
        <div className="like flex space-x-1 items-center">
          <form action={Addlike}>
            <input type="hidden" name="islike" value={String(!isLiked)} />
            <input type="hidden" name="post_id" value={id.toString()} />
            <button
              type="submit"
              className="w-[30px]"
              onClick={() => {
                setLiked((e) => !e);
              }}
            >
              {!isLiked ? (
                <svg
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 91 91"
                >
                  <g>
                    <path d="M52.7,71c-3.1,3.9,2.5,8.3,5.4,4.2c6.6-9.1,12.6-18.8,17.1-29.1c3.8-8.7,7-19.8,2.7-28.9c-4.7-10-15.6-3-20.5,2.7   c-4.6,5.4-7.7,11.8-10.3,18.4c-2.4-8-5.2-15.8-9.6-23C33.2,8,24.1,0.4,15.8,7.6c-8.4,7.3-4.6,19.3-1.2,28.1   c3.7,9.6,8.6,18.8,14.8,27c7,9.1,15.2,17.1,24.3,24c1.4,1.1,2.9-1.3,1.4-2.4C37.8,70.9,24.6,51.2,17.8,30.4   c-1.7-5.2-3.7-11.9-0.3-16.9c4.1-6.1,10.2-2.6,13.7,2.1C38.1,25,41.1,37,44.3,48c0.8,2.8,4.5,2.5,5.4,0c2.7-7.4,5.5-14.7,9.9-21.3   c2-3,4.6-6.4,7.9-8.2c5.3-2.9,6.8,2.3,7.1,6.7c0.5,8.6-3.5,16.8-7.4,24.1C62.9,57,58.1,64.3,52.7,71z" />
                  </g>
                </svg>
              ) : (
                <svg
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 100 100"
                >
                  <path d="M82.694,18.098c-1.97-2.98-4.61-4.202-7.486-4.337c-0.664-0.294-1.446-0.383-2.279-0.174  c-0.725,0.182-1.426,0.416-2.109,0.692c-4.444,1.16-8.944,3.995-12.112,6.381c-3.343,2.517-6.277,5.505-8.717,8.828  c-1.409-4.338-3.548-8.451-6.376-12.125C39.054,11.439,30.99,3.701,22.492,5.604c-4.516,1.011-6.493,4.696-7.074,8.846  c-0.716,5.123-0.891,10.298-0.571,15.458c0.643,10.367,3.111,20.556,6.497,30.385c3.889,11.291,8.945,22.173,14.04,32.99  c1.536,3.262,5.96,1.394,6.238-1.579c0.817,0.183,1.675,0.098,2.34-0.399c15.617-11.679,28.069-26.914,35.82-44.52  C83.496,38.351,88.414,26.748,82.694,18.098z M58.66,36.255c2.361-3.282,4.852-6.474,7.489-9.553  c0.512-0.597,1.029-1.205,1.562-1.801c-4.528,11.318-12.004,21.43-17.67,32.323c-0.025-1.186-0.05-2.373-0.075-3.559  c-0.02-0.947-0.375-1.683-0.913-2.21C51.953,46.217,55.148,41.136,58.66,36.255z M30.007,21.611  c0.038,0.045,0.069,0.083,0.084,0.104c0.568,0.773,1.119,1.558,1.654,2.353c0.318,0.473,0.629,0.951,0.934,1.431  c-0.426,0.516-0.674,1.196-0.627,2.029c0.193,3.404,0.364,6.806,0.533,10.207c-0.075-0.355-0.151-0.71-0.227-1.065  c-0.938-4.419-1.951-8.849-2.351-13.351C29.965,22.83,29.995,22.222,30.007,21.611z M50.46,77.055  c0.014,0.005,0.029,0.009,0.043,0.014c-0.014,0.013-0.028,0.026-0.042,0.04C50.461,77.091,50.46,77.073,50.46,77.055z   M54.681,65.078c3.296-5.477,6.942-10.729,10.919-15.738C62.307,54.78,58.558,59.986,54.681,65.078z M78.396,28.03  c-1.059-0.237-2.229-0.025-3.13,0.825c-1.156,1.091-2.289,2.203-3.409,3.326c1.77-3.619,3.305-7.339,4.435-11.235  c0.511,0.435,0.911,1.073,1.25,1.865C78.25,24.463,78.467,26.237,78.396,28.03z M43.137,30.479  c-1.631-3.522-3.551-6.917-5.747-10.138C39.906,23.377,41.835,26.821,43.137,30.479z M22.139,15.411  c0.203-1.339,0.323-2.905,1.845-3.338c1.205-0.342,2.744,0.089,3.915,0.547c-1.05,0.089-2.114,0.579-3.146,1.648  c-3.12,3.229-1.655,9.261-1.098,13.116c1.598,11.06,4.435,22.024,6.758,32.959c0.65,3.061,1.145,6.146,1.71,9.203  c-3.833-9.285-7.092-18.775-9.002-28.619C21.507,32.61,20.867,23.818,22.139,15.411z" />
                </svg>
              )}
            </button>
          </form>
          <button className="number">{noLike + (!isLiked ? 0 : 1)}</button>
        </div>
        <div className="comment flex space-x-1 items-center">
          <Link href={"/post/" + id}>
            <button className="w-[30px]">
              <svg
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                x="0px"
                y="0px"
                viewBox="0 0 91 91"
              >
                <g>
                  <path d="M9.1,79.1c7.6-1.8,14.9-3,22.7-2.4c7.8,0.6,15.4,2.8,22.3,6.4c3.2,1.7,6-3.2,2.8-4.8c-13.1-6.8-29.8-9.8-44.4-5.8   c3.6-10.5,7.3-20.8,9.1-31.8c1.8-11.2,2.7-23.7,0.6-35c2.5,1.1,5.5,1.5,8,2c4.4,0.9,8.9,1.4,13.3,1.6c7.4,0.4,14.8,0,22.2-1   c-0.1,4.6-0.5,9.2-0.9,13.8c-0.1,1.9,2.1,2.9,3.6,2.1c3.2-1.8,6.8-3,10.3-4.4c-2.6,3.9-4.7,8.3-6.7,12.4c-2.6,5.3-5,10.7-6.8,16.3   c-3.9,11.9-5.1,24.6-4.6,37c0.1,4.1,6.5,4.1,6.3,0c-0.6-12.1,0.3-24,3.4-35.6c1.4-5.3,3.2-10.5,5.4-15.6c2.3-5.4,5.6-10.7,7.2-16.4   c1.3-0.7,2.6-1.5,3.9-2.3c0.2-0.2,0.4-0.5,0.4-0.8c1.6-1.2,1.5-4.3-1.4-4.5c-4.9-0.3-9.9-1.2-14.5-3c0,0,0,0,0-0.1   c2.1-1.3,0.7-5.3-2.2-4.7c-8.4,1.6-17,2.3-25.5,2.1C39.5,4.4,35.4,4,31.4,3.6c-3.6-0.4-8-1.8-11.6-0.9c-0.5,0.1-0.7,0.8-0.3,1.2   c0.1,0.1,0.2,0.2,0.4,0.3c-0.2,6.3,0.4,12.6,0.1,18.9c-0.3,5.9-1,11.7-2.1,17.5c-2.4,11.8-6.3,23.9-11.6,34.7   C5.2,77.3,6.8,79.6,9.1,79.1z M71.3,8.4c0-0.1,0-0.1,0-0.2c4,2.1,8,4.2,12.1,6c-4.5,1-8.9,2.9-13.4,4.4   C70.4,15.3,70.8,11.8,71.3,8.4z" />
                  <path d="M54.3,24.2c0.9-1.1,0.9-2.4,0-3.5c-1.2-1.4-2.5-1.2-4.2-1.1c-2.8,0.3-5.5,0.7-8.3,1.1c-5,0.7-10.3,0.8-15.1,2.3   c-1.8,0.6-1.4,3,0.4,3.2c4.2,0.4,8.6-0.3,12.8-0.7c1.9-0.1,3.8-0.3,5.7-0.4c0.8-0.1,3.5-0.5,4.9-0.6c0.4,0.3,0.9,0.5,1.5,0.6   C52.9,25.2,53.7,24.9,54.3,24.2z" />
                  <path d="M51.1,32.9c3.3,0.2,2.9-5.4-0.6-4.6c-6.9,1.6-14.4,1.2-21.2,3.3c-1,0.3-0.7,1.7,0.2,1.8C36.7,34.2,44,32.5,51.1,32.9z" />
                  <path d="M40.9,39.7c-4.2-0.4-9.4-0.3-13.5,0.8c-1,0.3-1.1,1.8,0,2.1c4.3,0.9,9.2,1.1,13.5,1.1C43.6,43.8,43.5,40,40.9,39.7z" />
                  <path d="M28,50.1c4.3,0.7,8.6,0.7,12.9,0.9c2.6,0.1,2.6-4.2,0-4.1c-4.3,0.2-8.6,0.2-12.9,0.9C26.9,48,26.9,49.9,28,50.1z" />
                  <path d="M22.9,58.6c10.2,0.2,20.4,0.8,30.5,2.2c3.5,0.5,4.2-4.5,0.7-4.8c-10.4-1-20.8-1.2-31.2,0C21.3,56.2,21.2,58.6,22.9,58.6z" />
                </g>
              </svg>
            </button>
          </Link>
          <div className="number">{noComment}</div>
        </div>
        <div id="caption" className="inline space-x-2">
          {caption}
        </div>
      </div>
      <div className="w-[90%] mt-4 h-px dark:bg-white/15 relative top-4 left-1/2 -translate-x-1/2"></div>
    </div>
  );
}
