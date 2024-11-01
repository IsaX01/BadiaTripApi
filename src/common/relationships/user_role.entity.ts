import { Role } from "src/role/entities/role.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserRole {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.userRole)
    userId: User;

    @ManyToOne(() => Role, role => role.userRole)
    roleId: Role;
}