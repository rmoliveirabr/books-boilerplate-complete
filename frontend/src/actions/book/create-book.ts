'use server';

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation';

import { FetchAdapter } from '@/adapter/fetch-adapter'
import { BookRequest } from '@/actions/book/book-request'

export async function createBook(body: BookRequest) {
  try {
    const httpAdapter = new FetchAdapter()
    const response = await httpAdapter.post('/books', body)

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.message)
    }
  } catch (error) {
    console.log('Error action:');
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }

  revalidatePath('/books');
  redirect('/books');  
}
