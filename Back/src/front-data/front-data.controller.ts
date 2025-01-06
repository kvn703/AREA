import { Controller, Get, Query, Req, UseGuards, Delete, Res, HttpException } from '@nestjs/common';
import { FrontDataService } from './front-data.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { ServiceEntity } from 'src/entity/service.entity';
import { ActionEntity } from 'src/entity/action.entity';
import { ReactionEntity } from 'src/entity/reaction.entity';

@Controller('api')
export class FrontDataController {
    constructor(private readonly frontDataService: FrontDataService) {}

    @ApiOkResponse({ description: 'Return all services' })
    @ApiCreatedResponse({ type : ServiceEntity })
    @Get('services/get')
    async handleServices() {
        return this.frontDataService.getServices();
    }

    @ApiOkResponse({ description: 'Return action of the service' })
    @ApiCreatedResponse({ type : ActionEntity })
    @Get('actions/get')
    async handleActions(@Query('serviceId') serviceId: number) {
        return this.frontDataService.getActions(serviceId);
    }

    @ApiOkResponse({ description: 'Return all reactions' })
    @ApiCreatedResponse({ type : ReactionEntity })
    @Get('reactions/get')
    async handleReactions(@Query('serviceId') serviceId: number) {
        return this.frontDataService.getReactions(serviceId);
    }

    @ApiOkResponse({ description: 'Return all user services' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('user/services/get')
    async handleUserServices(@Req () req: any) {
        return this.frontDataService.getUserServices(req.user.email);
    }

    @ApiOkResponse({ description: 'Return action of the service' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('areas/get')
    async handleAreas(@Req () req: any) {
        return this.frontDataService.getAreas(req.user.email);
    }

    @Delete('areas/delete')
    @ApiBearerAuth()
    @ApiParam({ name: 'areaId', type: 'number' })
    @ApiNotFoundResponse({ description: 'Area not found'})
    @ApiOkResponse({ description: 'Area deleted'}) 
    @UseGuards(AuthGuard)
    async deleteArea(@Req() req: any) {
        return this.frontDataService.deleteArea(req.user.sub, req.query.areaId);
    }
}
