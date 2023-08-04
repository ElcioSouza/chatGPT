import { NextResponse } from 'next/server'
import GqlClient from '../../../graphql/apollo-client';
import { gql } from '@apollo/client';

export async function GET() {
    const {data} = await GqlClient.query({
        query: gql`
           query {
            chat {
              id
              title
              messages
            }
           }
        `
      });
        
    return NextResponse.json({ data })
  }

  