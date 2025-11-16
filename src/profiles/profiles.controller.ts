import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ProfilesService } from "./profiles.service";
import { CreateProfileDto } from "src/dtos/create-profile-dto";
import { UpdateProfileDto } from "src/dtos/update-profile-dto";

@Controller('profiles')
export class ProfilesController {
    constructor(private readonly profilesService: ProfilesService) { }

    @Post()
    async create(@Body() createDto: CreateProfileDto) {
        const created = await this.profilesService.create(createDto);
        return { statusCode: 201, data: created };
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const profile = await this.profilesService.findOne(id);
        return profile;
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateProfileDto,
    ) {
        const updated = await this.profilesService.update(id, dto);
        return updated;
    }
}