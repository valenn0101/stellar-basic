import { Controller, OnModuleInit } from '@nestjs/common';
import { StellarService } from '../service/stellar.service';

@Controller('stellar')
export class StellarController implements OnModuleInit {
  constructor(private readonly stellarService: StellarService) {}

  async onModuleInit() {
    //await this.stellarService.createTestAccount();
    //await this.stellarService.checkBalance();
    await this.stellarService.sendPaymentTransaction();
  }
}
