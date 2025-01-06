import { Module } from '@nestjs/common';
import { InstagramController } from './instagram.controller';
import { InstagramService } from './instagram.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [InstagramController],
  providers: [InstagramService]
})
export class InstagramModule {}
