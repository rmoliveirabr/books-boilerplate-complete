'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { showToast } from '@/components/toast';
import { signIn } from 'next-auth/react';
// import logger from '@/logger'; 

const FormSignInSchema = z.object({
  username: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters',
  }),
  // workspaceId: z.string().optional(),
})

export type FormSignInSchemaProps = z.infer<typeof FormSignInSchema>

// for signup, this is done in an server action... however, nextauth's signIn cannot be used on server side, so we need to do it here
async function handleSignIn(data: FormSignInSchemaProps) {
  try {
    // console.log('handleSignIn', data.username, data.password) // TODO: remove

    const result = await signIn('credentials', {
      redirect: false, // Prevent automatic redirection
      email: data.username,
      password: data.password,
      // workspaceId: data.workspaceId, // Add workspaceId if needed
    });

    console.log('result from handleSignIn', result) // TODO: remove

    if (!result || result.error) { 
      const message = `An error occurred during sign-in${result?.error ? ': ' + result?.error: ''}`; // TODO: locale
      showToast(message, 'error');
      console.log('Sign-in failed:', message);
    } else {
      // Successful sign-in
      // TODO: redirect to main page
      console.log('Sign-in successful!'); // TODO: locale
    }
  } catch (error) {
    console.log('Sign-in failed:', error); // TODO: locale
    showToast('An error occurred during sign-in.', 'error'); // TODO: locale
    return;
  }
}

export function useSignIn() {
  const { formState, register, handleSubmit, formState: { errors } } = useForm<FormSignInSchemaProps>({
    resolver: zodResolver(FormSignInSchema),
    defaultValues: {
      username: '',
      password: '',
      // workspaceId: '',
    },
  })

  return { handleSignIn, handleSubmit, formState, register, errors }
}