import jwt from 'jsonwebtoken';
import { NextResponse,NextRequest } from 'next/server'
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
    const json = await req.json()
    return NextResponse.json({"user":json})
/*     return new Response('Hello, Next.js!', {
        status: 200,
        headers: { 'Set-Cookie': `token=aaaqdcffgrr` },
      }) */
	//return NextResponse.json({ "sucess": "ok" })
/*        const tokenSecret = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
      if(tokenSecret) {
         const token = jwt.sign({userId: req.formData, userEmail: req.data.userLogin.email},tokenSecret, { expiresIn: '24h' });
         cookies().set('token', "", { expires: 1 });
		 const cookieToken = cookies().get("token")
		 return NextResponse.json({ token,cookieToken })
      } */
  }

  