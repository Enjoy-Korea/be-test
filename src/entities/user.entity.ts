import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Index()
  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  public getId() {
    return this.id;
  }
}
