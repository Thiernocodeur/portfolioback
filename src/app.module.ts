import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ContactModule } from './contact/contact.module';
import { Contact } from './contact/contact.entity'; // Assurez-vous que le chemin est correct

@Module({
  imports: [
    ConfigModule.forRoot(), // Charge les variables d'environnement depuis le fichier .env
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Contact], // Assurez-vous que toutes vos entités sont incluses
        synchronize: true, // Utiliser avec prudence en production
      }),
      inject: [ConfigService],
    }),
    ContactModule, // Assurez-vous que le module Contact est correctement configuré
  ],
})
export class AppModule {}
