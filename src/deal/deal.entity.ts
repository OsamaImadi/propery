import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PaginateableBaseEntity } from '@tfarras/nestjs-typeorm-pagination';

@Entity()
export class Deal extends PaginateableBaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
      nullable: false
    })
    fileNo:string;

    @Column({
      nullable: false
    })
    fileSecurityNo:string;

    @Column({
      nullable: true
    })
    orderInitiationDate:string;

    @Column({
      nullable: true
    })
    orderCompletionDate:string;

    @Column({
      nullable: true
    })
    orderCreatedBy:string;

    @Column({
      nullable: true
    })
    assignedTo:string;

    @Column({
      nullable: true
    })
    recievedBy:string;

    @Column({
      nullable: true
    })
    project:string;

    @Column({
      nullable: true
    })
    invoiceId:string;

    @Column({ 
      nullable: false
    })
    orderStatus:string;
        
    @Column(
      "decimal",{
      nullable: true
    })
    totalPayable:number;
        
    @Column(
      "decimal",{
      nullable: true
    })
    minDiscount:number;
        
    @Column(
      "decimal",{
      nullable: true
    })
    minDiscountPercentage:number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: 'timestamp', select: false })
    updatedAt!: Date;
}