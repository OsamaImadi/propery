import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PaginateableBaseEntity } from '@tfarras/nestjs-typeorm-pagination';

@Entity()
export class Invoice extends PaginateableBaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
      nullable: true
    })
    invoiceId:string;

    @Column({
      nullable: true
    })
    transactionType:string;

    @Column({
      nullable: false
    })
    transactionId:string;

    @Column({
      nullable: true
    })
    buyerId:string;

    @Column({
      nullable: true
    })
    buyerEntityType:string;

    @Column({
      nullable: true
    })
    sellerId:string;

    @Column({
      nullable: true
    })
    sellerEntityType:string;

    @Column({
      nullable: true
    })
    fileNo:string;

    @Column({
      nullable: true
    })
    numberOfFiles:number;
        
    @Column(
      "decimal",{
      nullable: true
    })
    minimumDepositDiscount:number;
        
    @Column(
      "decimal",{
      nullable: true
    })
    totalPayableAmount:number;
        
    @Column(
      "decimal",{
      nullable: true
    })
    amountPaidUpfront:number;
        
    @Column(
      "decimal",{
      nullable: true
    })
    remainingPayableAmount:number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: 'timestamp', select: false })
    updatedAt!: Date;
}