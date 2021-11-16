import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { PaginateableBaseEntity } from '@tfarras/nestjs-typeorm-pagination';
import { PlotFiles } from './../plot-files/plot-files.entity';

@Entity()
export class Records extends PaginateableBaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
      nullable: false
    })
    fileNo:string;

    @Column({
      nullable: false,
      default: 'ASSIGNMENT_CHANGE'
    })
    type: 'ASSIGNMENT_CHANGE' | 'PRICE_CHANGE';
 
    @Column({
      type: 'jsonb',
      array: false
    })
    fileObject: PlotFiles;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: 'timestamp', select: false })
    updatedAt!: Date;
}