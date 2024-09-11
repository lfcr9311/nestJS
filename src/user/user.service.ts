import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 8),
    };
    const createdUser = await this.prisma.user.create({
      data: user,
    });

    return this.removePassword(createdUser);
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map(user => this.removePassword(user));
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return this.removePassword(user);
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return this.removePassword(user);
  }

  async update(id: number, data: any) {
    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data,
    });

    return this.removePassword(updatedUser);
  }

  async remove(id: number) {
    const deletedUser = await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return this.removePassword(deletedUser);
  }

  async removeAll() {
    return this.prisma.user.deleteMany();
  }

  private removePassword(user: any) {
    const { password, ...result } = user;
    return result;
  }
}
