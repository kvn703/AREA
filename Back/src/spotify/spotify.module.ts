import { Module } from '@nestjs/common';
import { SpotifyController } from './spotify.controller';
import { SpotifyService } from './spotify.service';
import { AuthModule } from 'src/auth/auth.module';
import { ReactionSpotify } from './reactionSpotify';

@Module({
  imports: [AuthModule],
  controllers: [SpotifyController],
  providers: [SpotifyService, ReactionSpotify],
  exports: [ReactionSpotify],
})
export class SpotifyModule {}
