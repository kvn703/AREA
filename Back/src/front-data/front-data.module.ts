import { Module } from '@nestjs/common';
import { FrontDataService } from './front-data.service';
import { FrontDataController } from './front-data.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [FrontDataService],
  controllers: [FrontDataController]
})
export class FrontDataModule {}
