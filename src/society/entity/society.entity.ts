import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PaginateableBaseEntity } from '@tfarras/nestjs-typeorm-pagination';

@Entity()
export class Society extends PaginateableBaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ 
      nullable: false
    })
    societyName:string;
    
    @Column({ 
      nullable: false,
      unique:true
    })
    societyId:string;
    
    @Column({ 
      nullable: true
    })
    contactNo:string;
    
    @Column({ 
      nullable: true
    })
    ownerName:string;
    
    @Column({ 
      nullable: true
    })
    area:string;
    
    @Column({ 
      nullable: true
    })
    legalStatus:string;
    
    @Column({ 
      nullable: true
    })
    developerCompanyName:string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: 'timestamp', select: false })
    updatedAt!: Date;
}