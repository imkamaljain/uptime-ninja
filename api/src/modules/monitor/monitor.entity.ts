import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { User } from "../user/user.entity";

@Entity("monitors")
@Unique(["user_id", "url"])
export class Monitor {
  constructor(partial: Partial<Monitor>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "bigint",
    nullable: false,
  })
  user_id: number;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    type: "text",
    nullable: false,
  })
  url: string;

  @Column({
    type: "text",
    default: "unknown",
  })
  status: string;

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  ssl_valid_from: Date;

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  ssl_valid_to: Date;

  @CreateDateColumn({
    type: "timestamptz",
  })
  created_at: Date;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;
}
