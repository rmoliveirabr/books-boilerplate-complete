import { PipeTransform, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';
import { fromZodError } from 'zod-validation-error';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') {
      // Skip validation for anything other than body
      return value;
    }

    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = error.errors.map(e => e.path.join('.')).join(', ');
        const customMessage = `Validation error for fields: ${fieldErrors}`; // TODO: locale

        throw new BadRequestException({
          message: customMessage,   
          statusCode: 400,
          errors: fromZodError(error),
        });
      }

      throw new BadRequestException('Validation failed');   // TODO: locale
    }
  }
}
