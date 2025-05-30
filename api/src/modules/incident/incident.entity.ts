import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Monitor } from "../monitor/monitor.entity";

@Entity("incidents")
export class Incident {
  constructor(partial: Partial<Incident>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "bigint",
    nullable: false,
  })
  monitor_id: number;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  title: string;

  @Column({
    type: "text",
    nullable: true,
  })
  description: string;

  @Column({
    type: "varchar",
    length: 50,
    default: "open",
  })
  status: string; // open, acknowledged, resolved

  @Column({
    type: "timestamptz",
    nullable: false,
  })
  started_at: Date;

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  resolved_at: Date;

  @CreateDateColumn({
    type: "timestamptz",
  })
  created_at: Date;

  @ManyToOne(() => Monitor, { onDelete: "CASCADE" })
  @JoinColumn({ name: "monitor_id" })
  monitor: Monitor;
}
