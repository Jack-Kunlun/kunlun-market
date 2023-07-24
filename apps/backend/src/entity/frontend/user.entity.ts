import { Exclude } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ type: "varchar", length: 30 })
  username: string;

  @Column({ type: "varchar", length: 30 })
  realName: string;

  @Exclude()
  @Column({ type: "varchar", length: 30 })
  password: string;

  @Exclude()
  @Column({ type: "varchar", length: 30 })
  passwordSalt: string;

  @Column({ type: "varchar", length: 20 })
  phone: string;

  @Column({ type: "varchar", length: 30, nullable: true })
  email: string;

  @Column({ type: "smallint", default: 1, nullable: true })
  status?: number;

  @Column({ type: "smallint", default: 1, nullable: true })
  roleId: number;

  @Column({ type: "int", default: 0 })
  createBy?: number;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
