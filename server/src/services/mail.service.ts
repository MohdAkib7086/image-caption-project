import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  async sendMail(to: string, subject: string, content: string): Promise<void> {
    // Implement email sending logic using your email provider or library
  }
}
