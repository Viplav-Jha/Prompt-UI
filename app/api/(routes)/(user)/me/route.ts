// pages/api/me.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { User,currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export  async function GET(req: NextApiRequest) {
  try {
    const user:User |null = await currentUser();

    if (!user) {
      return new NextResponse('Please login to access this resource!',{
        status:400,
      })
    }

   //todo --we need to check the user have any shop or not.

   return NextResponse.json({user})

         
  } catch (error) {
    console.error('Error fetching user:', error);
     return new NextResponse("Internal Error",{status:500})
  }
}
