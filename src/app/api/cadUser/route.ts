import { NextResponse, NextRequest } from 'next/server'
import GqlClient from '../../../graphql/apollo-client';
import { gql } from '@apollo/client';

export async function GET(request: Request) {
    try {
   /*   const { data } = await GqlClient.mutate({
        mutation: gql`mutation {
          createUserRegister(
            name: ${name}
            email: ${email}
            tel:  ${tel}
            password: ${password}
          ) {
            id
            name
            tel
            email
          }
        } `});

         mutation {
  createUserRegister(
    name: "elcio"
    email: "elcio@gmail.com"
    tel: "279999"
    password: "123"
  ) {
    id
    name
    tel
    email
  }
} 
 
      });

      return NextResponse.json({ data }) */
    } catch (error) {
      console.log(error) 
    }
}