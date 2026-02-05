import { IsInt, IsNotEmpty, Min } from "class-validator";

export class CreateConcertDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsInt()
    @Min(1)
    totalSeats: number;
}
