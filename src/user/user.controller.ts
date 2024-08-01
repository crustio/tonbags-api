import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { user } from '@prisma/client';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/users')
  async getCurrentUsersInfo(@Query() query: { address: string }) {
    if (!query?.address) return { success: false, data: null };
    return this.userService.user(query?.address);
  }

  @Post('/record')
  async recordUsersInfo(@Body() body: user) {
    const { address, file, fileName, fileSize, from } = body;
    if (!address || !file || !fileName || !fileSize || !from) {
      return { success: false };
    }
    return this.userService.recordUserInfo(body);
  }

  @Get('/all')
  async getAll(@Query() query: { address: string }) {
    return this.userService.user(query?.address);
  }
}
