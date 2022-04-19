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
export class Transaction extends PaginateableBaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
      nullable: true
    })
    transactionId:string;

    @Column({
      nullable: true
    })
    invoiceId:string;

    @Column({
      nullable: false
    })
    fileNo:string;

    @Column({
      nullable: false
    })
    buyerId:string;

    @Column({
      nullable: true
    })
    buyerEntity:string;

    @Column({
      nullable: false
    })
    sellerId:string;

    @Column({
      nullable: true
    })
    sellerEntity:string;

    @Column({
      nullable: false
    })
    societyName:string;

    @Column({
      nullable: false
    })
    productType:string;

    @Column({
      nullable: false
    })
    plotArea:string;

    @Column({
      nullable: true
    })
    completionDate:string;

    @Column({
      nullable: true
    })
    notes:string;

    @Column({
      nullable: true
    })
    status:string;

    @Column({
      nullable: true
    })
    totalPricePayable:number;

    @Column({
      nullable: true
    })
    remainingBalancePayable:number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: 'timestamp', select: false })
    updatedAt!: Date;
}