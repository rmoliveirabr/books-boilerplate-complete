import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@/infra/http/http.module';
import { AuthModule } from '@/infra/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
  ],
})
export class AppModule {}
