import { NextResponse } from 'next/server'
import GqlClient from '../../../graphql/apollo-client';
import { gql } from '@apollo/client';

export async function GET() {
    const {data} = await GqlClient.query({
        query: gql`
           query {
            links {
              id
              title
              url
            }
           }
        `
      });
    return NextResponse.json({ data })
  }

  