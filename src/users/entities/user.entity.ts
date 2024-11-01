import { UserRole } from 'src/common/relationships/user_role.entity';
import { Role } from '../../common/enums/role.enum';
import { Status } from '../../common/enums/status.enum';

import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  firstName: string;
  
  @Column({ length: 20 })
  lastName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({length: 15, nullable: false})
  phoneNumber: number;

  @Column({type: 'enum', default: Status.ACTIVE, enum: Status})
  status: Status;

  @Column({ type: 'enum', default: Role.USER, enum: Role })
  role: Role;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @OneToOne(() => UserRole, userRole => userRole.userId)
  @JoinColumn()
  userRole: UserRole;
}
