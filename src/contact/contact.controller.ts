import { Controller, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from './contact.dto';

@Controller('api/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async create(@Body() contactDto: ContactDto) {
    const contact = await this.contactService.create(contactDto);
    return { message: 'Message reçu!', contact }; // `contact` est un seul objet
  }
}
