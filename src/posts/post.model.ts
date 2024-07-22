import { STRING, INTEGER, TEXT } from 'sequelize';
import {
  Model,
  Table,
  Column,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from '../users/user.model';

interface PostCreationsAttrs {
  title: string;
  content: string;
  image: string;
  userId: number;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationsAttrs> {
  @Column({
    type: INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: STRING, allowNull: true, defaultValue: '' })
  title: string;

  @Column({ type: TEXT, allowNull: true, defaultValue: '' })
  content: string;

  @Column({ type: STRING, defaultValue: '' })
  image: string;

  @ForeignKey(() => User)
  @Column({ type: INTEGER })
  user_id: number;

  @BelongsTo(() => User)
  author: User;
}
