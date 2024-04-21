import { useEffect, useRef } from "react";

type Props = {
  src: string;
  fallback: string | React.ReactNode;
  alt?: string;
} & React.HTMLAttributes<HTMLImageElement>;

export default function ImageComponent({ src, fallback, alt, ...props }: Props){
  let imageRef = useRef<HTMLImageElement>(null);
  let fallParent = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    let _image = new Image();
    imageRef.current!.style.display = 'none';
    imageRef.current!.style.overflow = 'hidden';
    let imageElement = imageRef.current;
    _image.onload = function(e){
      imageElement!.src = _image.src;
    }
    fallParent.current!.style.display = 'none';
    imageRef.current!.style.display = '';
    _image.src = src;
  }, []);

  return (
    <>
      <div ref={fallParent} className="w-full">{fallback}</div>
      <img ref={imageRef} alt={alt} {...props} />
    </>
  );
}