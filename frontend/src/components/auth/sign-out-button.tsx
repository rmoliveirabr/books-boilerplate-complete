'use client'

import Button from '@mui/material/Button';
import { signOut } from 'next-auth/react'

import { useUserData } from '@/hooks/use-user-data';

export function SignOutButton() {
  const handleSignOut = async () => { 
    await signOut({
      callbackUrl: '/',
    });
  }

  const { username } = useUserData();

  return (
    <div>
      <div style={{ alignItems: 'right', fontSize: 12}}>Hello {username}!</div>
      <form action={handleSignOut}>
        {/* TODO: improve styling location */}
        <Button type="submit" sx={{
          backgroundColor: 'none',
          color: 'white'
        }}>
          Sign Out
        </Button>
      </form>
    </div>
  )
}
