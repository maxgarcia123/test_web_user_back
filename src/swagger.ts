import { INestApplication } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Web Application API')
    .setDescription('API da aplicação Web Ponto Tel ')
    .setVersion('1.0')
    .setContact(
      'Max Garcia',
      'https://github.com/maxgarcia123',
      'maxg.silva123@gmail.com',
    )
    .addBearerAuth()
    .build();

  const custom: SwaggerCustomOptions = {
    customSiteTitle: 'Web_application API',
  };

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/', app, document, custom);
}
