import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder() //app.listen 전에 위치시켜야 한다.
    .setTitle('API 문서제목')
    .setDescription('API 문서설명')
    .setVersion('0.0.1')
    .addBearerAuth()
    .addTag('API 문서 태그')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document); // 'api-docs'는 swagger문서로 접속할 url을 말한다.

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
