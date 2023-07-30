import { NextResponse,NextRequest } from "next/server";

export function middleware(request: NextRequest,res:NextResponse) {
   console.log("middleare")     
  //console.log(NextRequest.prototype)
   let cookie = request.cookies.get('token')
   if(!cookie) {
      return NextResponse.redirect(new URL("/login",  request.url))
   }
}

export const config = {
   matcher: ["/:path"]
}