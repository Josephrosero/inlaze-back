import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    JoinTable,
    ManyToMany,
    UpdateDateColumn,
    CreateDateColumn,
  } from 'typeorm';
import { UserDetails } from './user.details.entity';
import { Role } from 'modules/role/role.entity';

  //import { Role } from '../role/role.entity';
  
  @Entity('users')
  export class User extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
    full_name: string;
  
    @Column({ type: 'varchar', nullable: false })
    email: string;
  
    @Column({ type: 'varchar', nullable: false })
    password: string;
  
    @OneToOne(type => UserDetails, {
      cascade: true,
      nullable: false,
      eager: true,
    })
    @JoinColumn({ name: 'detail_id' })
    details: UserDetails;
  
    @ManyToMany(type => Role, role => role.users, { eager: true })
    @JoinColumn({ name: 'user_roles' })
    roles: Role[];
  
    @Column({ default: false})
    is_deleted: boolean;
  
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
  }