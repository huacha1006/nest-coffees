import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap, map } from 'rxjs';

interface Data<T> {
  data: T;
}

@Injectable()
export class WrapResponseInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Data<T>> {
    return next.handle().pipe(
      map((data) => ({
        data,
        code: 200,
        message: null,
        success: true,
      })),
    );
  }
}
