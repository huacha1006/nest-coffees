import { SetMetadata } from '@nestjs/common';

export const Pubilc = (...args: string[]) => SetMetadata('pubilc', args);
