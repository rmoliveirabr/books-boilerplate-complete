export type MobileSenderParams = {
  phone: string;
  message: string;
};

export abstract class MobileSender {
  abstract send(params: MobileSenderParams): Promise<void>;
}
