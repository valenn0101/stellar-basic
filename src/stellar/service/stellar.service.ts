import { Injectable } from '@nestjs/common';
import * as StellarSdk from 'stellar-sdk';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class StellarService {
  private readonly server: StellarSdk.Server;
  private readonly sourceKeys: StellarSdk.Keypair;
  private readonly destinationId: string;

  constructor() {
    this.server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
    this.sourceKeys = StellarSdk.Keypair.fromSecret(
      'SCZANGBA5YHTNYVVV4C3U252E2B6P6F5T3U6MM63WBSBZATAQI3EBTQ4',
    );
    this.destinationId = process.env.PUBLIC_KEY;
  }

  async createTestAccount() {
    const pair = StellarSdk.Keypair.random();

    const secret = pair.secret();
    const publicKey = pair.publicKey();

    try {
      //Solicitamos la activacion de la cuenta
      const response = await fetch(
        `https://friendbot.stellar.org?addr=${publicKey}`,
      );

      const responseJSON = await response.json();
      console.log(responseJSON);

      fs.writeFileSync(
        path.join(__dirname, '../../../', '.env'),
        `SECRET=${secret}\nPUBLIC_KEY=${publicKey}`,
      );
      console.log('SUCCESS! You have a new account :)');
    } catch (error) {
      console.error('An error has occurred', error);
    }
  }

  async checkBalance() {
    try {
      const account = await this.server.loadAccount(process.env.PUBLIC_KEY);
      console.log('Balances for account: ' + process.env.PUBLIC_KEY);

      account.balances.forEach((balance) => {
        console.log('Type:', balance.asset_type, ', Balance:', balance.balance);
      });
    } catch (error) {
      console.error('An error has occurred', error);
    }
  }
}
