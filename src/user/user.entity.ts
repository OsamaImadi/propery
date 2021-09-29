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
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ 
      unique: true,
      nullable: false
    })
    email:string;

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
      nullable: false
    })
    addrress1:string;

    @Column({ 
      nullable: true
    })
    addrress2:string;

    @Column({ 
      nullable: true
    })
    occupation:string;

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

    @Column({ 
      nullable: true
    })
    paymentPlan:string;

    @Column({ 
      nullable: true
    })
    dealId:string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: 'timestamp', select: false })
    updatedAt!: Date;
}