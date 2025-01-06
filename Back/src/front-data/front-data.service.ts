import { HttpException, Injectable } from '@nestjs/common';
import { ServiceEntity } from 'src/entity/service.entity';
import { ReactionEntity } from 'src/entity/reaction.entity';
import { ActionEntity } from 'src/entity/action.entity';
import { UserServiceEntity } from 'src/entity/userService.entity';
import { UserEntity } from 'src/entity/user.entity';
import { AreaEntity } from 'src/entity/area.entity';
import e from 'express';
import { HttpStatusCode } from 'axios';

@Injectable()
export class FrontDataService {
  async getServices() {
    const services = await ServiceEntity.find();
    if (services.length === 0) return 'No services';
    return services;
  }

  async getActions(serviceId: number) {
    const actions = await ActionEntity.find({
      where: {
        service: { id: serviceId },
      },
    });
    if (actions.length === 0) return 'No actions';
    return actions;
  }

  async getReactions(serviceId: number) {
    const reactions = await ReactionEntity.find({
      where: {
        service: { id: serviceId },
      },
    });
    if (reactions === undefined || reactions === null) return 'No reactions';
    return reactions;
  }

  async getAreas(email: string) {
    const user = await UserEntity.findOneBy({
      email: email,
    });

    if (user === undefined || user === null) return 'No user';

    const areas = await AreaEntity.find({
      where: {
        user: { id: user.id },
      },
    });

    if (areas.length === 0) {
      console.log('pas dareas');
      return 'No areas';
    }
    const areaJsonArray: any[] = [];
    for (const area of areas) {
      const action = await ActionEntity.findOneBy({
        id: area.actionId,
      });
      const reaction = await ReactionEntity.findOneBy({
        id: area.reactionId,
      });
      if (
        action === undefined ||
        action === null ||
        reaction === undefined ||
        reaction === null
      )
        continue;
      areaJsonArray.push({
        actionName: action?.name,
        actionId: action?.serviceId,
        reactionName: reaction?.name,
        reactionId: reaction?.serviceId,
        areaId: area.id,
        areaName: area.areaName,
      });
    }
    return areaJsonArray;
  }

  async getUserServices(email: string) {
    const user = await UserEntity.findOneBy({
      email: email,
    });

    if (user === undefined || user === null) return 'No user';

    const userServices = await UserServiceEntity.find({
      where: {
        user: { id: user.id },
      },
    });

    if (userServices.length === 0) return 'No user services';

    const services = await ServiceEntity.find();

    if (services.length === 0) return 'No services';

    const servicesArray: string[] = [];

    for (let i = 0; i < services.length; i++) {
      for (let j = 0; j < userServices.length; j++) {
        if (services[i].id === userServices[j].serviceId) {
          servicesArray.push(services[i].name);
        }
      }
    }

    return servicesArray;
  }

  async deleteArea(userId: number, areaId: number) {
    if (
      userId === undefined ||
      (userId === null) === undefined ||
      areaId === null
    )
      throw new HttpException('Area not found', HttpStatusCode.NotFound);
    const areas = await AreaEntity.find({
      where: {
        user: { id: userId },
        id: areaId,
      },
    });
    if (areas.length === 0)
      throw new HttpException('Area not found', HttpStatusCode.NotFound);
    await AreaEntity.remove(areas);
    return 'Area deleted';
  }
}
