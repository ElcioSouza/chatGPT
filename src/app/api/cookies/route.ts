import jwt from 'jsonwebtoken';
import { NextResponse,NextRequest } from 'next/server'
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
    const json = await req.json()
    return NextResponse.json({"user":json})
  }

  