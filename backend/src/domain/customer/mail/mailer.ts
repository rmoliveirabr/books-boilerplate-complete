export type MailerParams = {
  to: string;
  subject: string;
  body: string;
  from: string;
};

export abstract class Mailer {
  abstract sendEmail(params: MailerParams): Promise<void>;
}
