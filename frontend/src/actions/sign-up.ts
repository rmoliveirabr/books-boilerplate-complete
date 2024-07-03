'use server'

import { FetchAdapter } from '@/adapter/fetch-adapter'

export type SignUpRequest = {
  name: string
  username: string
  password: string
  phone: string
  // phoneToken: string
  // terms: boolean
}

export async function signUp({ name, username, password, phone }: SignUpRequest) {
  const http = new FetchAdapter()

  try {
    const response = await http.post('/signup', {
      name,
      email: username,
      password,
      phone,
      // terms,
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.message)
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: error.message,
      }
    }
  }
}
