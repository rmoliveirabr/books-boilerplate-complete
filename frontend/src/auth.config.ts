import type { NextAuthOptions } from 'next-auth';
import jwt, { JwtPayload } from 'jsonwebtoken';

// import { NextResponse } from 'next/server'
// import { env } from './lib/env'

const decodeBase64Url = (base64String) => {
  const base64 = base64String.replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(base64, 'base64').toString('utf8');
};

function getSessionData(token) {
    const publicKey = decodeBase64Url(process.env.JWT_PUBLIC_KEY);
    // console.log('publicKey', publicKey);
    // console.log('token', token);

    const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
    if (!decoded || typeof decoded === 'string') {
      console.error('Error decoding token:');
      return {userId: null, username: null};
    }

    const { sub: userId, username } = decoded;
    // console.log( decoded );

    return {userId: userId, username: username};
  }

export const authConfig:NextAuthOptions = {
  // pages: {
  //   signIn: '/books',
  //   signOut: '/',
  // },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        return {
          ...token,
          // role: user.role || null,
          accessToken: user.accessToken,
          email: user.email,
          // type: user.type,
          // workspace: user.workspace,
        }
      }

      // console.log('jwt callback', user, token) // TODO: remove

      return token
    },
    async session({ session, token }) {
      const {userId, username} = getSessionData(token.accessToken);

      // session.role = token.role ? String(token.role) : undefined
      session.id = String(userId)
      session.username = String(username)
      session.accessToken = String(token.accessToken)
      // session.type = String(token.type)
      // session.workspace = String(token.workspace)

      return session
    },
  },
  providers: [],
}
