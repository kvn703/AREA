import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const DevMode = process.env.NODE_ENV === 'dev';
  var app = null;

  if (!DevMode) {
    const httpsOptions = {
      key: fs.readFileSync('./privkey.pem'),
      cert: fs.readFileSync('./fullchain.pem'),
    };

    app = await NestFactory.create(AppModule, {
      httpsOptions,
    });
  } else {
    console.log('Dev mode is set (http))');
    app = await NestFactory.create(AppModule);
  }

  const config = new DocumentBuilder()
    .setTitle('Area API')
    .setDescription('Area API description')
    .setVersion('1.0')
    .addBearerAuth({
      description: `JWT authorization token`,
      type: 'http',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
