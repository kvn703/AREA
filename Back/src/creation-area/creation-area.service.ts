import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { areaDto } from '../dto/area.dto';
import { UserEntity } from '../entity/user.entity';
import { ActionEntity } from '../entity/action.entity';
import { AreaEntity } from 'src/entity/area.entity';
import { ReactionEntity } from 'src/entity/reaction.entity';
import { UserServiceEntity } from 'src/entity/userService.entity';
import { ActionArray } from 'src/action/action.array';


@Injectable()
export class CreationAreaService {
  constructor(private readonly actionArray: ActionArray) {}
  async getUser(email: string): Promise<UserEntity | null> {
    const user = await UserEntity.findOneBy({ email: email });
    return user;
  }

  async getAction(actionId: number): Promise<ActionEntity | null> {
    const action = await ActionEntity.findOneBy({ id: actionId }).catch(
      (err) => {
        console.log('error get action ');
        return null;
      },
    );
    return action;
  }


  async getReaction(reactionId: number): Promise<ReactionEntity | null> {
    const reaction = await ReactionEntity.findOneBy({ id: reactionId });
    return reaction;
  }

  async getUserService(
    user: UserEntity,
    action: ActionEntity,
  ): Promise<UserServiceEntity | null> {
    const userServices = await UserServiceEntity.findOneBy({
      user: { id: user.id },
      service: { id: action.serviceId },
    }).catch((err) => {
      console.log('error get user service action');
      return null;
    });
    return userServices;
  }

  async getUserServiceReaction(
    user: UserEntity,
    reaction: ReactionEntity,
  ): Promise<UserServiceEntity | null> {
    const userServices = await UserServiceEntity.findOneBy({
      user: { id: user.id },
      service: { id: reaction.serviceId },
    }).catch((err) => {
      console.log('error get user service reaction');
      return null;
    });
    return userServices;
  }

  async HasMicrosoftAction(user: UserEntity): Promise<AreaEntity[]> {
    const areaEntity = await AreaEntity.createQueryBuilder('area')
      .leftJoinAndSelect('area.action', 'action')
      .where('action.id = :actionId', { actionId: 5 })
      .andWhere('area.user.id = :userId', { userId: user.id })
      .getMany();

    return areaEntity;
  }

  async createArea(areaData: areaDto, req: any): Promise<string> {
    const user: UserEntity | null = await this.getUser(req.user.email);
    if (user === null) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const action: ActionEntity | null = await this.getAction(
      areaData.id_Action,
    );
    if (action === null) throw new HttpException('Action not found', HttpStatus.NOT_IMPLEMENTED);

    const reaction: ReactionEntity | null = await this.getReaction(
      areaData.id_Reaction,
    );
    if (reaction === null) throw new HttpException('Reaction not found', HttpStatus.NOT_IMPLEMENTED);

    if (await this.getUserService(user, action) == null)
      throw new HttpException(`User not connected to service: ${action.serviceId}`, HttpStatus.NOT_ACCEPTABLE);

    if (await this.getUserServiceReaction(user, reaction) == null)
      throw new HttpException(`User not connected to service: ${reaction.serviceId}`, HttpStatus.NOT_ACCEPTABLE);

    try {
      const area: AreaEntity = AreaEntity.create();
      area.user = user;
      area.action = action;
      area.reaction = reaction;
      area.args_action = areaData.argsAction;
      area.args_reaction = areaData.argsReaction;
      area.areaName = areaData.areaName !== undefined ? areaData.areaName : '';

      const UserService = await this.getUserService(user, action);
      if (
        areaData.id_Action == 5 &&
        (await this.HasMicrosoftAction(user)).length > 0
      ) {
        await AreaEntity.save(area);
        return 'Area created but you already have a microsoft webhook';
      }

      await AreaEntity.save(area);
      this.actionArray.map[action.id](UserService, areaData.argsAction);
      return 'This action adds a new area';
    } catch (error) {
      console.log('error saving area: ', error);
      return 'Error saving area';
    }
  }
}
