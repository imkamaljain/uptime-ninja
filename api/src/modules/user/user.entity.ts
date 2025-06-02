import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id: number;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  name: number;

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
}
