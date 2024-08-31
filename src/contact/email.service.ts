import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_PORT'),
      secure: this.configService.get<boolean>('EMAIL_SECURE'),
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
  }

  async sendMail(contactDto: any): Promise<void> {
    const mailOptions = {
      from: contactDto.email,
      to: this.configService.get<string>('EMAIL_RECEIVER'),
      subject: contactDto.subject,
      text: contactDto.message,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
