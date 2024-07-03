'use client'

import { z } from 'zod'

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { showToast } from '@/components/toast';

import { BookRequest } from '@/actions/book/book-request'
import { getBook } from '@/actions/book/get-book'
import { createBook } from '@/actions/book/create-book'
import { updateBook } from '@/actions/book/update-book'

import { dateToString } from '@/lib/utils'

export const BookFormSchema = z.object({
  id: z.string().optional(),
  title: z.string({ required_error:'Título obrigatório' }), // i18n.t('forms:required') }),
  author: z.string({ required_error:'Autor obrigatório' }), // i18n.t('forms:required') }),
  summary: z.string().optional(),
  publisher: z.string().optional(),
  publicationDate: z.string({ required_error:'Data de publicação é obrigatória' }), // i18n.t('forms:required') }),
});

type Props = {
  bookId?: string;
  onSuccess: () => void;
}

export const useBookForm = ({bookId, onSuccess}: Props) => {
  const router = useRouter()

  const [formData, setFormData] = useState<BookRequest>({
    title: '',
    author: '',
    summary: '',
    publisher: '',
    publicationDate: dateToString(new Date()),
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // check submitted data
    const validationResult = BookFormSchema.safeParse(formData)
    // console.log(validationResult)
    if (!validationResult.success) {
      showToast('An error occurred', 'error');
      return; // TODO: check if return here
    }

    // save data
    try {
      // console.log('id to save:', bookId)
      if (bookId) {
        formData.id = bookId; // TODO: check if it's needed
        await updateBook(formData);
        showToast('Book updated successfully', 'success');
      } else {
        // console.log('formData:',formData)
        await createBook(formData);
        showToast('Book created successfully', 'success');
      }
      if (onSuccess) onSuccess();
      router.push('/books');
    } catch (error) {
      showToast('An error occurred', 'error');
    }
  };

  useEffect(() => {
    // console.log('bookId', bookId)
    const fetchBook = async () => {
      try {
        if (bookId) {
          const response = await getBook(bookId);
          // console.log('response:', response)
          setFormData({...response.book, publicationDate: dateToString(new Date(response.book.publicationDate))});
        }
      } catch (error) {
        showToast('An error occurred', 'error');
      }
    }
    fetchBook();
  }, [bookId]);

  return {formData, handleSubmit, handleChange};
}