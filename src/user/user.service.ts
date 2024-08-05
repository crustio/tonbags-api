import { Injectable, Logger } from '@nestjs/common';
import { user } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { calculateTotalFileSize } from 'src/utils/index';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(address: string, page: number, pageSize: number) {
    try {
      const data = await this.prisma.user.findMany({
        skip: (page - 1) * pageSize,
        take: Number(pageSize),
        where: { address },
        orderBy: {
          uploadDate: 'desc',
        },
      });
      const totalRecords = await this.prisma.user.count({
        where: {
          address,
        },
      });
      const filesSize =
        (await this.prisma.user.findMany({
          where: { address },
        })) || [];
      const acont = calculateTotalFileSize(filesSize, 'fileSize');

      return {
        success: data.length > 0,
        data,
        countFileSize: acont,
        pagination: {
          page,
          pageSize,
          totalRecords,
          totalPages: Math.ceil(totalRecords / pageSize),
        },
      };
    } catch (error) {
      Logger.error('queryUser', error);
      return { success: false, msg: 'server error!!', data: null };
    }
  }

  async recordUserInfo({
    bagId,
    address,
    from,
    fileName,
    file,
    fileSize,
  }: user) {
    try {
      const data = await this.prisma.user.create({
        data: {
          address,
          from,
          fileName,
          file,
          uploadDate: new Date().getTime().toString(),
          fileSize,
          bagId,
        },
        select: {
          id: true,
        },
      });
      return { success: !!data.id };
    } catch (error) {
      Logger.error('recordUserInfo', error);
      return { success: false, msg: 'server error!!', data: null };
    }
  }
}
