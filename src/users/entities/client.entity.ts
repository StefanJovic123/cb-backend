import { ChildEntity, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Photo } from 'src/photos/entities/photo.entity';

@ChildEntity()
export class Client extends User {
  @Column()
  avatar: string;

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];
}
