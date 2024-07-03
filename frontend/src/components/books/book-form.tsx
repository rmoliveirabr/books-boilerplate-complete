'use client'

import { TextField, Button, Grid } from '@mui/material';

import { BookRequest } from '@/actions/book/book-request'
import { useBookForm } from '@/hooks/use-book-form'

interface BookFormProps {
  book?: BookRequest;
  onSuccess: () => void;
  handleClose?: () => void;
  bookId?: string;
}

const BookForm: React.FC<BookFormProps> = ({ book, onSuccess, handleClose, bookId }) => {
  const {formData, handleSubmit, handleChange} = useBookForm({bookId, onSuccess});

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Publisher"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Publication Date"
            type="date"
            name="publicationDate"
            value={formData.publicationDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <Button type="submit" variant="contained" color="primary">
            {bookId ? 'Update' : 'Create'}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default BookForm;
