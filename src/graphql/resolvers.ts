import { Resolvers } from "./resolvers-type";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
//const uploadsFolder = path.resolve(__dirname,"uploads")
import jwt from "jsonwebtoken";
import { parse } from "cookie";
import { cookies } from "next/headers";

export const resolvers: Resolvers = {
  Query: {
    user: async (parent, args, ctx) => await ctx.prisma.user.findMany(),
    chat: async (parent, args, ctx) => await ctx.prisma.chat.findMany()
  },
  Mutation: {
    userLogin: async (parent, args, ctx) => {
      const { email, password } = args;
      const pwl: any = password;

      const user = await ctx.prisma.user.findFirst({
        where: {
          email: email,
        },
      });

      const isPasswordMatch = bcrypt.compare(pwl, user.password);

      if (!user || !isPasswordMatch) {
        throw new Error("Credenciais inválidas. Login falhou.");
      }
      const SECRET_KEY = process.env.JWT_SECRET_KEY;
      if (SECRET_KEY) {
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          SECRET_KEY,
          { expiresIn: "1h" }
        );

        return { ...user, token };
      }
    },
    createUserRegister: async (parent, args, ctx) => {
      
      const { name, tel, email, password, dataFile } = args;

      if (name && password && tel && email && dataFile) {
        const file_name: string = dataFile;

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Lógica para preencher os campos createdAt e updatedAt
        const createdAt = new Date().toISOString();
        const updatedAt = new Date().toISOString();

        const existingUser = await ctx.prisma.user.findFirst({
          where: {
            email: email
          },
        });

        if (existingUser) {
          throw new Error('Este e-mail já está cadastrado');
        }
        
         else {
          const novoCadastro = await ctx.prisma.user.create({
            data: {
              name: name,
              tel: tel,
              email: email,
              password: hashedPassword,
              dataFile: file_name,
              createdAt,
              updatedAt,
            },
          });
          return novoCadastro;
        }
      }
    },
    createChatRegister:  async (parent, args, ctx) => {
      const {title,messages} = args;
        // Lógica para preencher os campos createdAt e updatedAt
        const createdAt = new Date().toISOString();
        const updatedAt = new Date().toISOString();

      const cadastroChatUser = await ctx.prisma.chat.create({
        data: {
          title:title,
          messages:messages,
          createdAt,
          updatedAt,
        },
      });
      return cadastroChatUser
    }, 
    deleteChatAll:  async (parent, args, ctx) => {
      try {
        const deleteChat = await ctx.prisma.chat.deleteMany();
        return deleteChat;
      } catch (error) {
        console.error('Ocorreu um erro ao apagar os chats:', error);
        throw new Error('Não foi possível apagar todos os chats.');
      } 
    } 
  }
};
