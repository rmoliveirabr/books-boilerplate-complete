'use server';

import { FetchAdapter } from '@/adapter/fetch-adapter'

export async function getBook(id: string) {
  try {
    const httpAdapter = new FetchAdapter()
    const response = await httpAdapter.get(`/books/${id}`, {
      cache: 'no-cache'
    })
    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }  
}