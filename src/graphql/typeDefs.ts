import {gql} from "apollo-server-micro";
// defino oque posso pega ou cadastrar
export const typeDefs = gql`
scalar Upload
scalar DateTime

type Query {
    user:[User]
    chat:[Chat]
}

type User {
  id: ID
  name: String
  tel: String
  email: String
  password: String
  dataFile: Upload
  createdAt: DateTime
  updatedAt: DateTime
  token: String
  error: String
}

type Chat {
  id: ID
  title: String
  messages: String
  createdAt: DateTime
  updatedAt: DateTime
}

type Mutation {
  createUserRegister(name: String, tel: String, email: String, password: String, dataFile: Upload, createdAt: DateTime,updatedAt: DateTime): User
  userLogin(email: String,password: String): User
  createChatRegister(title: String, messages: String, createdAt: DateTime, updatedAt: DateTime): Chat
  updateChatRegister(title: String, messages: String, createdAt: DateTime, updatedAt: DateTime): Chat
  deleteChatAll:String!
}
`;