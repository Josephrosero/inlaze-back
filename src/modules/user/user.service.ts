import {
    Injectable,
    BadRequestException,
    NotFoundException,
  } from '@nestjs/common';
  import { UserRepository } from './user.repository';
  import { InjectRepository } from '@nestjs/typeorm';
  import { UserDto } from './dto/user.dto';
  import { User } from './user.entity';
  import { UserDetails } from './user.details.entity';
  import { getConnection, Repository } from 'typeorm';
  import { Role } from '../role/role.entity';
import { RoleRepository } from 'modules/role/role.repository';

  //import { status } from '../../shared/entity-status.num';
  
  @Injectable()
  export class UserService {
    constructor(
      @InjectRepository(UserRepository)
      private readonly _userRepository: UserRepository,
      @InjectRepository(RoleRepository)
      private readonly _roleRepository: RoleRepository,
    ) {}
  
    async get(id: number): Promise<User> {
      if (!id) {
        throw new BadRequestException('id must be sent');
      }
  
      const user: User = await this._userRepository.findOne( {
        where: { id : id, is_deleted : false },
      });
  
      if (!user) {
        throw new NotFoundException();
      }
  
      return user;
    }
  
    async getAll(): Promise<User[]> {
      const users: User[] = await this._userRepository.find({
        where: {   is_deleted : false  },
      });
  
      return users;
    }
  
    async create(user: User): Promise<User> {
      const details = new UserDetails();
      user.details = details;
  
      const repo = await getConnection().getRepository(Role);
      const defaultRole = await repo.findOne({ where: { name: 'GENERAL' } });
      user.roles = [defaultRole];
  
      const savedUser: User = await this._userRepository.save(user);
      return savedUser;
    }
  
    async update(id: number, user: User): Promise<void> {
      await this._userRepository.update(id, user);
    }
  
    async delete(id: number): Promise<void> {
      const userExist = await this._userRepository.findOne(  {
        where: { id : id, is_deleted : false },
      });
  
      if (!userExist) {
        throw new NotFoundException();
      }
  
      await this._userRepository.update(
        
        id, { is_deleted : false }
        
        );
    }
  
    async setRoleToUser(userId: number, roleId: number) {
      const userExist = await this._userRepository.findOne( {
        where:{ id : userId, is_deleted : false },
      });
  
      if (!userExist) {
        throw new NotFoundException();
      }
  
      const roleExist = await this._roleRepository.findOne( {
        where: { id : roleId, is_deleted : false },
      });
  
      if (!roleExist) {
        throw new NotFoundException('Role does not exist');
      }
  
      userExist.roles.push(roleExist);
      await this._userRepository.save(userExist);
  
      return true;
    }
  }