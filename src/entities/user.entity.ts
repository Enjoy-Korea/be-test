import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Index()
  @Column()
  email: string;

  @Column()
  password: string;

  public getId() {
    return this.id;
  }
}
