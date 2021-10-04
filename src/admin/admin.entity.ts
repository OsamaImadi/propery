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
import * as bcrypt from 'bcryptjs';

export async function hashIt(params: string) {
  let salt = await bcrypt.genSalt();
  let password = await bcrypt.hash(params, salt);
  return password;
}

@Entity()
export class Admin extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ 
      unique: true,
      nullable: false
    })
    email:string;

    @Column({ 
      unique: true,
      nullable: false,
      select: false
    })
    password:string;

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

    @Column({ 
      default: false
    })
    isAdmin:boolean;

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