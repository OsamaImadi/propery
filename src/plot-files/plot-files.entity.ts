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
export class PlotFiles extends PaginateableBaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ 
      unique: true,
      nullable: false
    })
    fileNo:string;

    @Column({ 
      unique: true,
      nullable: false
    })
    fileSecurityNo:string;

    @Column({
      nullable: false
    })
    fileType:string;

    @Column({
      nullable: false
    })
    projectName:string;

    @Column({
      nullable: false,
      default: 'AVAILABLE'
    })
    status:string;
    
    @Column({
      nullable: false
    })
    assignedTo:string;
    
    @Column({
      nullable: false
    })
    assignedDate:string;
    
    @Column({
      nullable: false
    })
    recievedBy:string;
    
    @Column({
      nullable: false
    })
    recievedDate:string;
    
    @Column({
      nullable: true
    })
    companyName:string;
    
    @Column({
      nullable: false
    })
    unitPrice:number;
    
    @Column({
      nullable: true
    })
    minimumRequiredDeposit:number;
    
    @Column({
      nullable: true
    })
    depositPercentage:number;
    
    @Column({
      nullable: true
    })
    lastfileAssigner:string;
    
    @Column({
      nullable: true
    })
    lastfileReciever:string;;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: 'timestamp', select: false })
    updatedAt!: Date;
}