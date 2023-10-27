import { Injectable } from "@nestjs/common";
import { UserDto } from "../modules/user/dto/user.dto";
import { User } from "../modules/user/user.entity";
import { TypeMapper } from "ts-mapper";


@Injectable()
    
export class MapperService extends TypeMapper {

    constructor(){
        super();
        this.config();
    }
    

    private config(): void{
        this.createMap<User, UserDto>()
        .map(entity => entity.id , dto => dto.id)
        .map(entity => entity.full_name , dto => dto.full_name)
        .map(entity => entity.email , dto => dto.email)
        .map(entity => entity.roles , dto => dto.roles)
        .map(entity => entity.is_deleted , dto => dto.is_deleted)
        .map(entity => entity.details , dto => dto.details)
    }
} 