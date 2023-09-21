import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { encry } from 'src/utils';
import * as crypto from 'crypto';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 30 })
  username: string; //用户名

  @Column()
  password: string; //密码

  @Column({ type: 'varchar', length: 255, charset: 'utf8mb4', nullable: true })
  name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  sex: number;

  @Column({ nullable: true })
  salt: string;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateTime: Date;

  @BeforeInsert()
  beforeInsert() {
    this.salt = crypto.randomBytes(4).toString('base64');
    this.password = encry(this.password, this.salt);
  }
}
