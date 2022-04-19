import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { PaginateableBaseEntity } from '@tfarras/nestjs-typeorm-pagination';

@Entity()
export class FileNotes extends PaginateableBaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ 
      nullable: false
    })
    fileNo:string;

    @Column({ 
      nullable: false
    })
    note:string;

    @Column({ 
      nullable: false
    })
    createdBy:string;

    @Column({ 
      nullable: true
    })
    creatorEntity:string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: 'timestamp', select: false })
    updatedAt!: Date;
}