import {gql} from "apollo-server-micro";
// defino oque posso pega ou cadastrar
export const typeDefs = gql`
scalar Upload
scalar DateTime

type Query {
    user:[User]
}

type Query {
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
  author: String
  body: String
  createdAt: DateTime
  updatedAt: DateTime
}

type Mutation {
  createUserRegister(name: String, tel: String, email: String, password: String, dataFile: Upload, createdAt: DateTime,updatedAt: DateTime): User
  userLogin(email: String,password: String): User
  createChatRegister(title: String, author: String, body: String, createdAt: DateTime, updatedAt: DateTime): Chat
}
`;