'use client'

import { useSession } from 'next-auth/react';

export const useUserData = () => {
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    // console.log('Session data:', session);
    return {status: status, userId: session.id, username: session.username};
  }

  return {status: 'error', userId: null, username: null};
}