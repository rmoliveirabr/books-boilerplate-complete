'use client'

import React from 'react';

import Link from 'next/link'
import Button from '@mui/material/Button';

export function SignInButton() {
  return (
    <form>
      {/* TODO: improve styling location */}
      <Button type="button" sx={{ '& a': { 
        textDecoration: 'none', 
        backgroundColor: 'none',
        color: 'white'
      }}}>
        <Link href="/signin">Sign In</Link>
      </Button>
    </form>
  )
}
