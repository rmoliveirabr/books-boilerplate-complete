import { Entity } from '@/core/entity'
import { User } from '@/domain/customer/entities/user'  

export type BookProps = {
  title: string;
  author: string;
  summary?: string;
  publisher?: string;
  publicationDate: Date;
  creatorId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Book extends Entity<BookProps> {
  get title() { return this.props.title; }
  set title(title:string) {
    this.props.title = title;
    this.touch();
  }

  get author() { return this.props.author; }
  set author(author:string) {
    this.props.author = author;
    this.touch();
  }

  get summary() { return this.props.summary || ''; }
  set summary(summary:string) {
    this.props.summary = summary;
    this.touch();
  }

  get publisher() { return this.props.publisher || ''; }
  set publisher(publisher:string) {
    this.props.publisher = publisher;
    this.touch();
  }

  get publicationDate() { return this.props.publicationDate; }
  set publicationDate(publicationDate:Date) {
    this.props.publicationDate = publicationDate;
    this.touch();
  }

  get creatorId() { return this.props.creatorId; }
  set creatorId(creatorId:string) {
    this.props.creatorId = creatorId;
    this.touch();
  }

  get updatedAt() { return this.props.updatedAt; }
  
  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(props: BookProps, id?: string,) {
    const book = new Book(
      {
        ...props,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      id,
    );

    return book;
  }
}
  