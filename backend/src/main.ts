import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';

import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const API_PORT = process.env.API_PORT || 3001;

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // Prefixo global para suas rotas de API
  
  // Enable CORS with specific options
  // TODO: validate if it's needed
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
  app.enableCors(corsOptions);

  // listen to requests  
  await app.listen(API_PORT);
  console.log(`Application is running on: http://localhost:${API_PORT}`);
}
bootstrap();