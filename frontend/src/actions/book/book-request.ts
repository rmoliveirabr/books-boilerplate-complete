export type BookRequest = {
  id?: string;
  title: string;
  author: string;
  summary?: string;
  publisher?: string;
  publicationDate: string;  
  creatorId: string;
}