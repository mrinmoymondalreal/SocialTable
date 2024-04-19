"use client";

import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';

export default function PerformLogin(){
  let router = useRouter();
  return (
    <GoogleLogin
      onSuccess={async credentialResponse => {
        if(credentialResponse.credential){
          let resp = await fetch('/api/auth?idToken='+credentialResponse.credential);
          if(resp.ok) router.refresh();
        }
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
}