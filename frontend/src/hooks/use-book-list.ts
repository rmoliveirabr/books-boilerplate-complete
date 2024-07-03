'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { showToast } from '@/components/toast';

import { BookRequest } from '@/actions/book/book-request'
import { getAllBooks } from '@/actions/book/get-all-books'
import { deleteBook } from '@/actions/book/delete-book'

import { useBookColumns } from '@/hooks/use-book-columns';

type Props = {
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
  handleEdit: (id: string) => void;
}

export const useBookList = ({ refresh, setRefresh, handleEdit }: Props)  => {
  const [books, setBooks] = useState<BookRequest[]>([]);
  // const [page, setPage] = useState<number>(0);
  // const [pageSize, setPageSize] = useState<number>(5);
  const [query, setQuery] = useState<string>('');
  const [rowCount, setRowCount] = useState<number>(-1);
  
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });

  const router = useRouter();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const correctedPage = (paginationModel.page + 1).toString(); // data-grid page starts with 0, backend expects first page to be 1
        const response = await getAllBooks({
          page: correctedPage,
          pageSize: paginationModel.pageSize.toString(),
          query: query
        });

        // console.log(`page: ${correctedPage}, pageSize: ${paginationModel.pageSize}, response:`, response)
       
        setBooks(response.books);
        setRowCount(response.totalCount);
      } catch (error) {
        showToast('An error occurred', 'error');
      }
    };

    fetchBooks();
  }, [paginationModel, query, refresh]);

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id);
      showToast('Book deleted successfully', 'success');
      setBooks(prev => prev.filter(book => book.id !== id));
      setRefresh(!refresh);
    } catch (error) {
      showToast('An error occurred', 'error');
    }
  };

  const columns = useBookColumns({handleEdit, handleDelete});

  return {books, columns, paginationModel, setPaginationModel, rowCount, setRowCount, query, setQuery};
}