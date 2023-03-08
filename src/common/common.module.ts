import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/Axios-adapter';

@Module({
  providers: [AxiosAdapter],
  exports: [AxiosAdapter],
})
export class CommonModule {}
