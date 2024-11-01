import { UserRole } from "src/common/relationships/user_role.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable: false, length: 20})
    roleName: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;

    @OneToOne(() => UserRole, userRole => userRole.roleId)
    @JoinColumn()
    userRole: UserRole;

}
