import { Module } from '@nestjs/common';
import { StellarService } from './service/stellar.service';
import { StellarController } from './controller/stellar.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [StellarService],
  controllers: [StellarController],
})
export class StellarModule {}
