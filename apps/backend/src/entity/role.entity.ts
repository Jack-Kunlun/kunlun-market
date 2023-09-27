import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ type: "varchar", length: 30 })
  roleName: string;

  @Column({ type: "jsonb", array: true, default: [] })
  authList: object[];

  @Column({ type: "varchar", default: "", length: 100, nullable: true })
  description: string;

  @Column({ type: "smallint", default: 1, nullable: true })
  status?: number;

  @Column({ type: "int", default: 0 })
  createBy?: number;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
