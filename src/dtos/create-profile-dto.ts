import { Type } from "class-transformer";
import { IsInt, IsISO8601, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateProfileDto {
    @Type(() => Number)
    @IsInt()
    userId: number;

    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsOptional()
    @IsISO8601()
    birthDate?: string;

    @IsOptional()
    @IsUrl()
    avatarUrl?: string;
}