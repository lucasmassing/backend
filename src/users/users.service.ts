import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDTO } from 'src/dtos/create-user-dto';
import { GetUserDTO } from 'src/dtos/get-user-dtop';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async createUser(dto: CreateUserDTO) {
        const passwordHash = await bcrypt.hash(dto.passwordHash, 10);
        return await this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                passwordHash: passwordHash
            }
        })
    }

    async getAllUsers(): Promise<GetUserDTO[]> {
        return this.prisma.user.findMany({
            select: { id: true, name: true, email: true, createdAt: true },
            orderBy: { name: 'asc' },
        });
    }

    async updateUser(id: number, dto: CreateUserDTO): Promise<void> {
        await this.prisma.user.update({
            where: { id },
            data: {
                name: dto.name ?? '',
                email: dto.email ?? ''
            }
        });
    }
    async deleteUser(id: number): Promise<void> {
        await this.prisma.user.delete({
            where: { id }
        });
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

}

