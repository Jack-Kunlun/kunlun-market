import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class AdminUser {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ type: "varchar", length: 30 })
  username: string;

  @Column({ type: "varchar", length: 30 })
  realName: string;

  @Column({ type: "varchar", length: 30 })
  password: string;

  @Column({ type: "varchar", length: 30 })
  passwordSalt: string;

  @Column({ type: "varchar", length: 20 })
  phone: string;

  @Column({ type: "varchar", length: 30, nullable: true })
  email: string;

  @Column({ type: "smallint", default: 1 })
  status: number;

  @Column({ type: "smallint", default: 1 })
  roleId: number;

  @Column({ type: "int", nullable: true })
  createBy: number;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
