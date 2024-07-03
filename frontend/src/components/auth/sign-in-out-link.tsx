'use client'

import React from 'react';

import { useUserData } from '@/hooks/use-user-data';

import { SignOutButton } from '@/components/auth/sign-out-button';
import { SignInButton } from '@/components/auth/sign-in-button';

export default function SignInOutLink() {
  const { status } = useUserData();

  return (
    <div>
      {status == 'authenticated' ? 
        (<SignOutButton />) :
        (<SignInButton />)
      }
    </div>
  );
}