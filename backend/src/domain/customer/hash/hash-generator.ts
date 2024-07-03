export abstract class HashGenerator {
  abstract generator(plain: string): Promise<string>;
}
