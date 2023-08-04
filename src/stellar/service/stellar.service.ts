import { Injectable } from '@nestjs/common';
import * as StellarSdk from 'stellar-sdk';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class StellarService {
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
}
