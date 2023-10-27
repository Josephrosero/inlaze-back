import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { SharedModules } from 'shared/shared.modules';
import { UserController } from './user.controller';
import { RoleRepository } from 'modules/role/role.repository';

@Module({

imports: [TypeOrmModule.forFeature([UserRepository, RoleRepository]), SharedModules],
providers: [UserService],
controllers:[UserController]


})
export class UserModule {}
