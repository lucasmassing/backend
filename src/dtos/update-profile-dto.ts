import { IsISO8601, IsOptional, IsString, IsUrl } from "class-validator";

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    fullName?: string;

    @IsOptional()
    @IsISO8601()
    birthDate?: string;

    @IsOptional()
    @IsUrl()
    avatarUrl?: string;
}