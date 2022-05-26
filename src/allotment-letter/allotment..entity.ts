import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PaginateableBaseEntity } from '@tfarras/nestjs-typeorm-pagination';

@Entity()
export class Allotment extends PaginateableBaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ 
      nullable: false
    })
    fileNo:string;
    
    @Column({ 
      nullable: false
    })
    name:string;
    
    @Column({ 
      nullable: true
    })
    firstRelativeName:string;
    
    @Column({ 
      nullable: true
    })
    cnic:string;
    
    @Column({ 
      nullable: true
    })
    phoneNumber:string;
    
    @Column({ 
      nullable: true
    })
    address:string;
    
    @Column({ 
      nullable: true
    })
    buyerId:string;
    
    @Column({ 
      nullable: true
    })
    buyerEntity:string;
    
    @Column({ 
      nullable: true
    })
    sellerId:string;
    
    @Column({ 
      nullable: true
    })
    sellerEntity:string;
    
    @Column({ 
      nullable: true
    })
    transactionId:string;
    
    @Column({ 
      nullable: true
    })
    securityCode:string;
    
    @Column({ 
      nullable: true
    })
    fileType:string;
    
    @Column({ 
      nullable: true
    })
    plotSize:string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: 'timestamp', select: false })
    updatedAt!: Date;
}