'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { showToast, dismissToast } from '@/components/toast';
import { signUp } from '@/actions/sign-up'

// TODO: use locale
const FormSignUpSchema = z.object({
  name: z.string().min(2, { message: 'Name must contain at least 2 characters' }),
  username: z.string().email({ message: 'Email is required' }),
  password: z
    .string()
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter' })
    .regex(/[0-9]/, { message: 'Contain at least one number' })
    .regex(/[^a-zA-Z0-9]/, { message: 'Contain at least one special character' })
    .min(8, { message: 'Be at least 8 characters long' })
    .trim(),
    phone: z.string().optional().transform((value) => value?.trim() || '') // Trim empty values
      .refine((phone) => phone ? phone.length >= 8 : true, {
        message: 'Must be empty or at least 8 characters long'
      }),
})

export type FormSignUpSchemaProps = z.infer<typeof FormSignUpSchema>

async function handleSignUp(data: FormSignUpSchemaProps, router, handleSignIn) {
 
  const response = await signUp({
    ...data,
  })  

  if (response?.message) {
    return showToast(response.message, 'error')
  }

  showToast('SignUp added successfully...', 'success')

  // automatically sign in user and redirect to home page
  if (data?.username && data?.password) {
    await handleSignIn({
      username: data.username,
      password: data.password,
      // workspaceId: workspace.customers[0].id,
    })

    router.push('/');
  }
}

export function useSignUp() {
  const { register, handleSubmit, formState: { errors }, formState, watch } = useForm<FormSignUpSchemaProps>({
    resolver: zodResolver(FormSignUpSchema),
    defaultValues: {
      name: '',
      username: '',
      password: '',
      phone: '',
      // ...user,
    },
  })

  return { handleSignUp, handleSubmit, formState, register, errors, watch }
}