import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { user } from '@prisma/client';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/users')
  async getCurrentUsersInfo(
    @Query() query: { address: string; page: number; pageSize: number },
  ) {
    const { address = '', page = 1, pageSize = 10 } = query;
    if (!query?.address) return { success: false, data: null };
    return this.userService.user(address, page, pageSize);
  }

  @Post('/record')
  async recordUsersInfo(@Body() body: user) {
    const { bagId, address, file, fileName, fileSize, from } = body;
    if (!bagId || !address || !file || !fileName || !fileSize || !from) {
      return { success: false };
    }
    return this.userService.recordUserInfo(body);
  }
}
