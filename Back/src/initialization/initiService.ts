import { OnModuleInit } from '@nestjs/common';
import { ServiceEntity } from 'src/entity/service.entity';
import { ActionEntity } from 'src/entity/action.entity';
import { ReactionEntity } from 'src/entity/reaction.entity';
import { promises as fsPromises } from 'fs';


export class InitService implements OnModuleInit {

  async onModuleInit() {
    async function createReactions(serviceId: ServiceEntity, reactions: any[]) {
      try {
        for (const reactionInfo of reactions) {
          const reactionEntity = ReactionEntity.create();
          reactionEntity.id = reactionInfo.reactionId;
          reactionEntity.name = reactionInfo.name.toLowerCase();
          reactionEntity.description = reactionInfo.description;
          reactionEntity.service = serviceId;
          reactionEntity.nbr_args = reactionInfo.params.length;
          reactionEntity.args_reaction = JSON.stringify(reactionInfo.params);
          await reactionEntity.save();
        }
        console.log(`Réaction créée avec succès pour le service ${serviceId.name}.`);
      } catch (error) {
        console.log(`Erreur lors de la création des réactions pour le service ${serviceId.name}:`, error.message);
      }
    }

    async function createActions(serviceId: ServiceEntity, actions: any[]) {
      try {
        for (const ActionInfo of actions) {
          const actionEntity = ActionEntity.create();
          actionEntity.id = ActionInfo.actionId;
          actionEntity.name = ActionInfo.name.toLowerCase();
          actionEntity.description = ActionInfo.description;
          actionEntity.service = serviceId;
          actionEntity.nbr_args = ActionInfo.params.length;
          actionEntity.args_action = JSON.stringify(ActionInfo.params);
          await actionEntity.save();
        }
        console.log(`Action créée avec succès pour le service ${serviceId.name}.`);
      } catch (error) {
        console.log(`Erreur lors de la création des Actions pour le service ${serviceId.name}:`, error.message);
      }
    }

    async function createService(serviceInfo: any) {
      try {
        const existingService = await ServiceEntity.findOne({ where: { name: serviceInfo.name.toLowerCase() } });
        if (existingService) return;
        const serviceEntity = ServiceEntity.create();
        serviceEntity.name = serviceInfo.name.toLowerCase();
        serviceEntity.description = serviceInfo.description;
        serviceEntity.logo_url = serviceInfo.logo_url;
        await serviceEntity.save();
        console.log(`Service ${serviceInfo.name} créé avec succès.`);
        await createReactions(serviceEntity, serviceInfo.reactions);
        await createActions(serviceEntity, serviceInfo.actions);
      } catch (error) {
        console.log(`Erreur lors de la création du service ${serviceInfo.name}:`, error.message);
      }
    }

    try {
      const jsonData = await fsPromises.readFile('./about.json', 'utf-8');
      const config = JSON.parse(jsonData);
      console.log('Lecture de about.json réussie.');
      for (const serviceInfo of config.server.services) {
        await createService(serviceInfo);
      }
    } catch (error) {
      console.error('Erreur lors de la lecture de about.json :', error);
    }
  }
}
