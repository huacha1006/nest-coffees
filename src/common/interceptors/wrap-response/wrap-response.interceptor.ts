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
    console.log('before...');
    // return next.handle().pipe(tap((data) => console.log('After...', data)));
    return next.handle().pipe(
      map((data) => ({
        data,
        status: 0,
        message: null,
        success: true,
      })),
    );
  }
}
