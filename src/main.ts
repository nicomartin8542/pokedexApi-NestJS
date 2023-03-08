import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Defino el prefijo de todas mis url
  app.setGlobalPrefix('api/v2');

  //Defino validaciones globales (Pipes) para los requests
  app.useGlobalPipes(
    new ValidationPipe({
      //Permite filtrar el request enviado, esto facilita para evitar que nos llege datos no pedidos
      whitelist: true,
      //Obliga al cliente que envie el request especifica que nosotros le digamos.
      forbidNonWhitelisted: true,
      //Estos capmpos tranforman los datos de los dto de acuerdo a los tipo de datos especificados
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(process.env.PORT);
  console.log(`System is running in port ${process.env.PORT}`);
}
bootstrap();
