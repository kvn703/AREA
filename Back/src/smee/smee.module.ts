// smee.module.ts

import { Module } from '@nestjs/common';
import Client = require('smee-client');
import { Inject } from '@nestjs/common';

@Module({
  providers: [
    {
      provide: 'SmeeClientToken',
      useValue: new Client({
        source: 'https://smee.io/iDDj9mJTxmyCHTV',
        target: 'http://localhost:3000/api/Webhook/GitHub',
        logger: console,
      }),
    },
  ],
  exports: ['SmeeClientToken'],
})
export class SmeeModule {
  constructor(@Inject('SmeeClientToken') private readonly smeeClient: Client) {
    const events = smeeClient.start();

    events.on('message', (message: string) => {
      console.log('Message reçu smee:');
      // Faites ici le traitement que vous souhaitez effectuer avec le message reçu
    });
  }
}
