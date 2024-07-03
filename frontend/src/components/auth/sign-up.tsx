'use client'

import { TextField, Button, Grid } from '@mui/material'

// import { useSignUpContext } from '@/contexts/sign-up'
import { useSignUp } from '@/hooks/use-signup'

import { useRouter } from 'next/navigation';
import { useSignIn } from '@/hooks/use-signin'

import { PasswordValidation } from '@/components/auth/password-validation';

export function FormSignUp() {
  const router = useRouter();
  const { handleSignIn } = useSignIn()
  const { handleSignUp, handleSubmit, formState, register, errors, watch } = useSignUp()

  return (
    <div>
      <h2>Sign Up</h2>
      <div>
        <form className="grid" onSubmit={handleSubmit((data) => handleSignUp(data, router, handleSignIn))}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...register('name', { required: true })}
                label="Name"
                name="name"
                placeholder="Name" 
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
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
              {/* Make password validations */}
              <PasswordValidation watch={watch} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('phone', { required: false })}
                name="phone"
                label="Phone"
                placeholder="Phone"
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />                
            </Grid>
            <Grid item xs={6}>
              <Button type="submit" disabled={formState.isSubmitting}>
                  Sign Up
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button type="button">
                Contact us
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  )
}
