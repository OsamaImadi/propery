import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { 
  Length,
  IsNotEmpty,
} from 'class-validator';

@Entity()
export class PlotFiles extends BaseEntity {

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
      nullable: true
    })
    unitPrice:number;
    
    @Column({
      nullable: true
    })
    minimumRequiredDeposit:number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: 'timestamp', select: false })
    updatedAt!: Date;
}