import { STRING, INTEGER, JSONB } from 'sequelize';
import { Model, Table, Column, HasMany } from 'sequelize-typescript';
import { Post } from '../posts/post.model';

interface UserCreationsAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationsAttrs> {
  @Column({
    type: INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: STRING, allowNull: false })
  password: String;

  @Column({ type: STRING, allowNull: true })
  first_name: string;

  @Column({ type: STRING, allowNull: true })
  last_name: string;

  @Column({ type: STRING, allowNull: true })
  avatar: string;

  @Column({ type: STRING, allowNull: true })
  address: string;

  @Column({ type: STRING, allowNull: true })
  birthday: string;

  @Column({ type: JSONB, allowNull: true })
  user_information: object;

  @HasMany(() => Post)
  posts: [];
}
