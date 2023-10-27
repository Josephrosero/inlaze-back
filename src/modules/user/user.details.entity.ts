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

 // import { Role } from '../role/role.entity';
  
  @Entity('user_details')
  export class UserDetails extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
    name: string;

    @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
    lastname: string;
  
    //@ManyToMany(type => Role, role => role.users, { eager: true })
    //@JoinTable({ name: 'user_roles' })
    //roles: Role[];

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
  }