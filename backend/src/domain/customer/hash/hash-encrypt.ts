export abstract class HashEncrypt {
  abstract encrypt(payload: Record<string, unknown>): Promise<string>;
}
