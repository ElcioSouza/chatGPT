// pages/api/upload.js
import multer from 'multer';
import { NextRequest, NextResponse } from 'next/server'
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { writeFile } from 'fs/promises'
const uploadsFolder = path.resolve(__dirname,"uploads")

const upload = multer({
  dest: uploadsFolder, // Pasta temporária para armazenar a imagem
});

export const config = {
  api: {
    bodyParser: false, // Desabilita o parsing automático do corpo da requisição
  },
};



export async function GET(request: NextRequest) {
  upload.single("file");
  return NextResponse.json({ success: true })
}
