import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException) // @Catch() 데코레이터는 인자에 해당하는 에러가 발생했을 때, 해당 필터가 적용되도록 합니다. 그리고 해당하는 에러가 발생하면 필터를 거치면서 클라이언트(프론트)에게 { statusCode: status, timestamp: new Date().toISOString(), path: request.url, message: exception.message } 를 리턴합니다.
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
