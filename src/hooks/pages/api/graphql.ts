import { ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";
import { typeDefs } from "../../graphql/typeDefs";
import { resolvers } from "../../graphql/resolvers";
import { context } from "../../graphql/context";
import { NextApiHandler } from "next";
import { RequestHandler } from "micro";
//import { NextRequest, NextResponse } from "next/server";
//import {redirect} from "next/navigation"
// qualquer dispositivo queram usar minha api graphql ativei Cors()
const cors = Cors();

// configurar para next, estou desativando intepletador do next para so graphql tratar essas inforamação
export const config = {
    api: {
        bodyParser: false //toda informacao agente que manda corpo requisicao, fala para next não intepretar esta mandando corpo da requisicao somente graphql vai intepretar isso, ou seja estou desativando o intepretador do next para informação que vieram pelo corpo da requisição e somente graphql vai fazer isso
    }
}

// criar nosso servidor, juntando tudo os typeDefs,resolvers,context
const apolloServer = new ApolloServer({typeDefs,resolvers,context});
// vamos inciar nosso servidor
const startServer = apolloServer.start();

// endpoint do next
const handler: NextApiHandler = async (req,res) => {
    // graphql vai fazer essa funcao estou encerrando options estou fazendo verificacao do metodo, pois ele vai usar graphql
    if(req.method === "OPTIONS") {
        res.end();
        return false;
    }
    await startServer;
    // se pessoa fazer requisicao em get ou sem nenhum body vai manda para ir /api/graphql
    const apolloHandler = await apolloServer.createHandler({
        path: '/api/graphql',
    })
    return apolloHandler(req,res);
}

export default cors(handler as RequestHandler)