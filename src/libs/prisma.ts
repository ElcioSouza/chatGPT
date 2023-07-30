// conexão com prisma
import {PrismaClient} from "@prisma/client";  
// uma variavel global que tem uma propriedade prisma que ela é prismaClient ou então é undefined 
// mesmo que recriei o projeto essa variavel continua rodando, evitando que fica recriando o banco varias veses e pesando o servidor
declare global {
    var prisma: PrismaClient | undefined;
}
// global.prisma se ja foi criado
// new PrismaClient(); cria uma conexão 
// se tiver uma conexao feita usa global.prisma caso contrario cria conexao
export const prisma = global.prisma || new PrismaClient();


if(process.env.NODE_ENV !== "production") {
    global.prisma = prisma;
}

export default prisma