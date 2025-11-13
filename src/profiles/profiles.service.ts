import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateProfileDto } from "src/dtos/create-profile-dto";
import { UpdateProfileDto } from "src/dtos/update-profile-dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ProfilesService {
    constructor(private prisma: PrismaService) { }

    async create(createDto: CreateProfileDto) {
        const { userId, fullName, birthDate, avatarUrl } = createDto;

        // Verifica se user existe
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new BadRequestException(`User with id ${userId} does not exist.`);
        }

        // Verifica se já existe profile para esse user
        const existing = await this.prisma.profile.findUnique({ where: { userId } });
        if (existing) {
            throw new ConflictException(`User with id ${userId} already has a profile`);
        }

        // Converte birthDate se necessário
        const data: any = {
            userId,
            fullName,
            avatarUrl: avatarUrl ?? null,
            birthDate: birthDate ? new Date(birthDate) : null,
        };

        const created = await this.prisma.profile.create({
            data,
            include: { user: false },
        });

        return created;
    }

    async findOne(id: number) {
        const profile = await this.prisma.profile.findUnique({
            where: { id },
        });

        if (!profile) {
            throw new NotFoundException(`Profile with id ${id} not found.`);
        }
        return profile;
    }

    async update(id: number, dto: UpdateProfileDto) {
        const profile = await this.prisma.profile.findUnique({ where: { id } });
        if (!profile) {
            throw new NotFoundException(`Profile with id ${id} not found`);
        }

        const data: any = {};
        if (dto.fullName !== undefined) data.fullName = dto.fullName;
        if (dto.avatarUrl !== undefined) data.avatarUrl = dto.avatarUrl;
        if (dto.birthDate !== undefined) data.birthDate = dto.birthDate ? new Date(dto.birthDate) : null;

        const updated = await this.prisma.profile.update({
            where: { id },
            data,
        });

        return updated;
    }
}
