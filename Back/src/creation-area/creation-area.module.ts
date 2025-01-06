import { Module } from '@nestjs/common';
import { CreationAreaController } from './creation-area.controller';
import { CreationAreaService } from './creation-area.service';
import { ActionModule } from 'src/action/action.module';

@Module({
    imports: [ActionModule],
    controllers: [CreationAreaController],
    providers: [CreationAreaService],
})
export class CreationAreaModule {}
