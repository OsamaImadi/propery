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
export class Patient extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ 
      unique: true,
      nullable: false
    })
    dealerCode:string;

    @Column({ 
      unique: true,
      nullable: false
    })
    phoneNo:string;

    @Column({ 
      unique: true,
      nullable: false
    })
    CNIC:string;

    @Column({ 
      unique: true,
      nullable: false
    })
    securityCode:string;

    @Column({ 
      nullable: false
    })
    dealerType:string;

    @Column({ 
      nullable: true
    })
    subDealerId:string;

    @Column({ 
      nullable: true
    })
    companyNumber:string;

    @Column({ 
      nullable: true
    })
    dealNumber:string;

    @Column({ 
      nullable: true
    })
    totalPayableAmount:number;

    @Column({ 
      nullable: true
    })
    totalRecievedAmount:number;

    @Column({ 
      nullable: true
    })
    totalRemainingAmount:number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: 'timestamp', select: false })
    updatedAt!: Date;
}