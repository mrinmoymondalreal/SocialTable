import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
  const searchParams = request.nextUrl.searchParams;
  let response = new NextResponse();
  if(searchParams.get('logout') == 'true'){
    response.cookies.set('token', '');
    return response;
  }
  response.cookies.set('token', searchParams.get('idToken') || "");
  return response;
}