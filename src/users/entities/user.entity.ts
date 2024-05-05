import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 25 })
  firstName: string;

  @Column({ type: 'varchar', length: 25 })
  lastName: string;

  @Column({ type: 'varchar', length: 300, unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
