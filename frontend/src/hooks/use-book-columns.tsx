'use client'

import React from 'react';

import { GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { dateToString } from '@/lib/utils';

import { useUserData } from '@/hooks/use-user-data';

type Props = {
  handleEdit: (id: string) => void
  handleDelete: (id: string) => void;
}

export const useBookColumns = ({handleEdit, handleDelete}: Props) => {
  const { userId } = useUserData(); 

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'author', headerName: 'Author', flex: 1 },
    { field: 'publisher', headerName: 'Publisher', flex: 1 },
    { field: 'summary', headerName: 'Summary', flex: 1 },
    { field: 'publicationDate', headerName: 'Publication Date', renderCell: ({value}) => dateToString(new Date(value)), flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <div>
          {userId === params.row.creatorId ? <Button onClick={() => handleEdit(params.row.id)}>Edit</Button> : null}
          {userId === params.row.creatorId ? <Button onClick={() => handleDelete(params.row.id)}>Delete</Button> : null}
        </div>
      ),
      flex: 1,
    },
  ];

  return columns;
}

