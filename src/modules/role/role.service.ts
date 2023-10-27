import {
    Injectable,
    BadRequestException,
    NotFoundException,
  } from '@nestjs/common';
  import { RoleRepository } from './role.repository';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Role } from './role.entity';
  
  @Injectable()
  export class RoleService {
    constructor(
      @InjectRepository(RoleRepository)
      private readonly _roleRepository: RoleRepository,
    ) {}
  
    async get(id: number): Promise<Role> {
      if (!id) {
        throw new BadRequestException('id must be sent');
      }
  
      const role: Role = await this._roleRepository.findOne(  {
        where: {  id: id, is_deleted : false },
      });
  
      if (!role) {
        throw new NotFoundException();
      }
  
      return role;
    }
  
    async getAll(): Promise<Role[]> {
      const roles: Role[] = await this._roleRepository.find({
        where: { is_deleted: false },
      });
  
      return roles;
    }
  
    async create(role: Role): Promise<Role> {
      const savedRole: Role = await this._roleRepository.save(role);
      return savedRole;
    }
  
    async update(id: number, role: Role): Promise<void> {
      await this._roleRepository.update(id, role);
    }
  
    async delete(id: number): Promise<void> {
      const roleExists = await this._roleRepository.findOne(  {
        where: { id: id, is_deleted : false },
      });
  
      if (!roleExists) {
        throw new NotFoundException();
      }
  
      await this._roleRepository.update(id, { is_deleted: true });
    }
  }