'use client'

import { useState } from 'react';

import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';

import BookList from '@/components/books/book-list';
import BookForm from '@/components/books/book-form';

import { useUserData } from '@/hooks/use-user-data';

export const BookPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [idForEdit, setIdForEdit] = useState('');

  const handleAdd = () => {
    setOpen(true);
    setIdForEdit('');
  };

  const handleEdit = (id:string) => {
    setOpen(true);
    setIdForEdit(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSuccess = () => {
    setOpen(false);
    setRefresh(prev => !prev); // Toggle refresh to reload the list
  };

  const { status, userId, username } = useUserData();

  return (
    <div>
      <h1>Books</h1>
      {status === 'authenticated' ? (
      <Button variant="outlined" color="primary" onClick={handleAdd}>
        Add New Book
      </Button>) : null}
      <br /><br />
      <BookList refresh={refresh} setRefresh={setRefresh} handleEdit={handleEdit} />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Book Data</DialogTitle>
        <DialogContent>
          <BookForm onSuccess={handleSuccess} handleClose={handleClose} bookId={idForEdit} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

