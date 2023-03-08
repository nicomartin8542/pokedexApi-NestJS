import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { ValidationSchemaEnv } from './config/schema.joi';
@Module({
  controllers: [],
  providers: [ConfigService],
  imports: [
    //Parametro para la configuracion de variables de entorno
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: ValidationSchemaEnv,
    }),

    //Especificamos que carpeta va a servir como publica en nuestra aplicacion
    //Esto nos sirve para cuando no se coloque nada en el url nos lleve a la carpeta publica de nuestro proyecto
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    MongooseModule.forRoot(new ConfigService().getOrThrow('MONGO_DB')),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {}
