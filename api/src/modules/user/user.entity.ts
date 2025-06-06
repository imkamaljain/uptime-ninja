import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  email: string;

  @Column({
    type: "varchar",
    length: 15,
  })
  password: string;

  @Column({
    type: "boolean",
    default: false,
  })
  email_opt_in: boolean;

  @Column({
    nullable: true,
  })
  slack_webhook_url: string;

  @Column({
    type: "boolean",
    default: false,
  })
  is_deleted: boolean;
}
