import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StellarModule } from './stellar/stellar.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    StellarModule,
  ],
})
export class AppModule {}
