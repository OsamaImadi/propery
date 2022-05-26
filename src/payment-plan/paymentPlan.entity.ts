import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PaginateableBaseEntity } from '@tfarras/nestjs-typeorm-pagination';

@Entity()
export class PaymentPlan extends PaginateableBaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ 
      nullable: false
    })
    paymentCycle:number;
    
    @Column({ 
      nullable: false
    })
    fileNo:string;
    
    @Column({ 
      nullable: true
    })
    firstInstallmentDueDate:string;
    
    @Column({ 
      nullable: true
    })
    installmentAmount:number;
    
    @Column({ 
      nullable: true
    })
    totalPayable:number;
    
    @Column({ 
      nullable: true
    })
    amountPerInstallment:number;

    @Column({ 
      nullable: true
    })
    transactionId:string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: 'timestamp', select: false })
    updatedAt!: Date;
}