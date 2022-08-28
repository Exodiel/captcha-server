import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('validate/captcha')
  async postToken(@Body() data: { token: string }, @Res() res: Response) {
    const response = await this.appService.validateCaptcha(data);
    return res.status(200).json({
      success: response,
    });
  }
}
