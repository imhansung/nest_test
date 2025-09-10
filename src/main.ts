import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalFilters(new HttpExceptionFilter()); // 필터 모든 컨트롤러에서 사용하기. app.module 에서 의존성주입하는 방법을 주로 사용

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
