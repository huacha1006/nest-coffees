import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 255, charset: 'utf8mb4' })
  name: string;

  @Column()
  phone: string;

  @Column()
  age: number;

  @Column()
  sex: number;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;
}
