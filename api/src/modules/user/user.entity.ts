import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("users")
export class User {
  @PrimaryColumn({
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
    type: "boolean",
    default: false,
  })
  email_opt_in: boolean;
}
