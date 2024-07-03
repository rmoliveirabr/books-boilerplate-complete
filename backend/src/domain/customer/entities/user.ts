import { Entity } from '@/core/entity';
import { Optional } from '@/core/optional';
import { Book } from '@/domain/book/entities/book';

export type UserProps = {
  username: string;
  password: string;
  name?: string | null;
  phone?: string | null;
  // books: Book[];
  resetPasswordToken?: string | null;
  confirmedEmail?: boolean;
  active: boolean;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt?: Date | null;
};

export class User extends Entity<UserProps> {
  get username() { return this.props.username; }
  set username(username: string) {
    this.props.username = username;
    this.touch();
  }

  get password() { return this.props.password; }
  set password(password: string) {
    this.props.password = password;
    this.touch();
  }

  get name() { return this.props.name || ''; }
  set name(name: string) {
    this.props.name = name;
    this.touch();
  }

  get phone() { return this.props.phone || ''; }
  set phone(phone: string) {
    this.props.phone = phone;
    this.touch();
  }

  // get books() { return this.props.books || []; }
  // set books(books: Book[]) {
  //   this.props.books = books; // TODO: check if this is the correct copy
  //   this.touch();
  // }

  get resetPasswordToken() { return this.props.resetPasswordToken || ""; }
  set resetPasswordToken(resetPasswordToken: string | null) {
    this.props.resetPasswordToken = resetPasswordToken;
    this.touch();
  }

  get confirmedEmail() { return this.props.confirmedEmail || false; }
  set confirmedEmail(confirmedEmail: boolean) {
    this.props.confirmedEmail = confirmedEmail;
    this.touch();
  }

  get active() { return this.props.active || false; }
  set active(active: boolean) {
    this.props.active = active;
    this.touch();
  }

  get deletedAt() { return this.props.deletedAt || null; }
  set deletedAt(deletedAt: Date | null) {
    this.props.deletedAt = deletedAt;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(props: Optional<UserProps, "createdAt">, id?: string) {
    const user = new User(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    );

    return user;
  }
}
