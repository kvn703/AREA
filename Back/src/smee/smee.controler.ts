// votre-controleur.controller.ts

import { Controller } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import Client = require("smee-client")

@Controller()
export class VotreControleurController {
  constructor(
    @Inject('SmeeClientToken') private readonly smeeClient: Client,
  ) {
    const events = this.smeeClient.start();
    console.log('SMEE: ', this.smeeClient);

    // Pour arrêter la redirection des événements
    // events.close();
  }
}
