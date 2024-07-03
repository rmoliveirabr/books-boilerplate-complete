'use client'

import Link from 'next/link'
import { TextField, Button, Grid } from '@mui/material'

import { useSignIn } from '@/hooks/use-signin';

export function FormSignIn() {
  const { handleSignIn, handleSubmit, formState, register, errors } = useSignIn();

  return (
    <form onSubmit={handleSubmit(handleSignIn)}>
      <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          {...register('username', { required: true })}
          type="email"
          label="Username"                
          name="username"
          placeholder="Email"
          error={!!errors.username}
          helperText={errors.username?.message}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
        />                
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('password', { required: true })}
            type="password"
            label="Password"
            name="password"
            placeholder="Password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <Button sx={{ '& a': {textDecoration: 'none', color: 'inherit'} }}>
            <Link href="/forgot-password" className="w-full border" >
              Forgot password?
            </Link>
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button type="submit" className="w-full mt-4" disabled={formState.isSubmitting}>
            Sign In
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button sx={{ '& a': {textDecoration: 'none', color: 'inherit'} }}>
            <Link href="/signup" className="w-full border">
              Sign Up
            </Link>
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
