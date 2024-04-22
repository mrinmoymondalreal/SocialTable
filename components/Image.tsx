import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  fallback: string | React.ReactNode;
  alt?: string;
} & React.HTMLAttributes<HTMLImageElement>;

export default function ImageComponent({ src, fallback, alt, ...props }: Props){
  let imageRef = useRef<HTMLImageElement>(null);

  let [showImage, setShowImage] = useState<null | string>(null);

  useEffect(()=>{
    let controller = new AbortController();
    let signal = controller.signal;
    const myHeaders = new Headers();
    myHeaders.append("Accept", "image/jpeg");
    fetch(src, {
      signal,
      method: "GET",
      headers: myHeaders,
      mode: "cors",
      cache: "default",
    }).then(e=>e.blob()).then(async blob=>{
      let src = URL.createObjectURL(blob);
      setShowImage(src);
    }).catch(err => {
      
    });
    return ()=>{
      controller.abort();
    }
  }, []);

  return (
    <>
      {!showImage ? fallback : <img src={showImage} alt={alt} {...props} />}
    </>
  );
}