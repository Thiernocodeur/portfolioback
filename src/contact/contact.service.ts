import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';
import { ContactDto } from './contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  async create(contactDto: ContactDto): Promise<Contact> {
    const contact = this.contactRepository.create(contactDto);
    await this.contactRepository.save(contact);
    return contact;
  }

  // Si vous avez une méthode qui retourne plusieurs contacts :
  async findAll(): Promise<Contact[]> {
    return this.contactRepository.find();
  }
}
