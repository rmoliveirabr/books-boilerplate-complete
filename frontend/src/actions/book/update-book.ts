'use server';

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation';

import { FetchAdapter } from '@/adapter/fetch-adapter'
import { BookRequest } from '@/actions/book/book-request'

export async function updateBook(body: BookRequest) {
  try {
    const httpAdapter = new FetchAdapter()
    const response = await httpAdapter.put(`/books/${body.id}`, body)

    if (!response.ok) {
      const data = await response.json()
      console.log(data)
      throw new Error(data.message)
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }

  revalidatePath('/books');
  redirect('/books');
}
