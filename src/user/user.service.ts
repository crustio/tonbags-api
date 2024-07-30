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

  async recordUserInfo(user: user) {
    console.log('useruser', user);

    try {
      const data = await this.prisma.user.create({
        data: {
          address: user.address,
          from: user.from,
          fileName: user.fileName,
          file: user.file,
          uploadDate: new Date().getTime().toString(),
          fileSize: user.fileSize,
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
