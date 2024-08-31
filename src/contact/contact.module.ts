import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './contact.entity';
import { ConfigModule } from '@nestjs/config'; // Importez ConfigModule ici

@Module({
  imports: [
    TypeOrmModule.forFeature([Contact]),
    ConfigModule, // Ajoutez ConfigModule ici
  ],
  providers: [ContactService],
  controllers: [ContactController],
})
export class ContactModule {}
