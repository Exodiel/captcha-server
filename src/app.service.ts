import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async validateCaptcha(data: { token: string }) {
    const secretKey = this.configService.get<string>('CAPTCHA_SECRET_KEY');
    const responseKey = data?.token;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${responseKey}`;
    this.httpService.post(url).subscribe((response) => {
      if (!response.data?.success) {
        return false;
      }
    });

    return true;
  }
}
