import { Injectable, Logger } from '@nestjs/common';
import { user } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(address: string) {
    try {
      const data = await this.prisma.user.findMany({ where: { address } });
      return { success: data.length > 0, data };
    } catch (error) {
      Logger.error('queryUser', error);
      return { success: false, data: 'server error!!' };
    }
  }

  async all() {
    try {
      const data = await this.prisma.user.findMany();
      return { success: data.length > 0, data };
    } catch (error) {
      Logger.error('queryUser', error);
      return { success: false, data: 'server error!!' };
    }
  }

  async recordUserInfo({ address, from, fileName, file, fileSize }: user) {
    try {
      const data = await this.prisma.user.create({
        data: {
          address,
          from,
          fileName,
          file,
          uploadDate: new Date().getTime().toString(),
          fileSize,
        },
        select: {
          id: true,
        },
      });
      return { success: !!data.id };
    } catch (error) {
      Logger.error('recordUserInfo', error);
      return { success: false, data: 'server error!!' };
    }
  }
}
