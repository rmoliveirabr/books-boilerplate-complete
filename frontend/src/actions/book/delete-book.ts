'use server';

import { FetchAdapter } from '@/adapter/fetch-adapter'
import { revalidatePath } from 'next/cache';

export async function deleteBook(id: string) {
  try {
    const httpAdapter = new FetchAdapter()
    const response = await httpAdapter.delete(`/books/${id}`, {
      cache: 'no-cache'
    })
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.message)
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }    
  
  revalidatePath('/books');

    // // TODO: improve formData validation
    // if (id == '') {
    //   return {
    //     message: 'Empty ID in deletion',
    //   };
    // }

    // try {
    //   const response = await fetch(`${API_BASE_URL}/api/books/${id}`, {
    //     method: 'DELETE',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });

    //   // TODO: check response
    // } catch (error) {
    //   console.error('Failed to Delete Book.', error);
    //   return {
    //       message: 'Failed to Delete Book.',
    //   };
    // }
  
    // revalidatePath('/books');
    // redirect('/books');
}