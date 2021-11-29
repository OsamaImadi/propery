import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { PaginateableBaseEntity } from '@tfarras/nestjs-typeorm-pagination';
import { hashIt } from 'src/admin/admin.entity';

@Entity()
export class Dealer extends PaginateableBaseEntity {

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
      nullable: false,
      default: 'gold'
    })
    dealerType:string;

    @Column({ 
      nullable: true
    })
    subDealerId:string;

    @Column({ 
      nullable: true
    })
    email:string;

    @Column({ 
      nullable: true
    })
    password:string;

    @Column({ 
      nullable: true
    })
    name:string;

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

    @Column({ 
      nullable: true
    })
    dealId:number;

    @Column({ 
      nullable: true
    })
    parent:string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: 'timestamp', select: false })
    updatedAt!: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
      if (this.password) {
        this.password = await hashIt(this.password)
      }
    }
}