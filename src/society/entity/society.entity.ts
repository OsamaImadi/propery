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
      nullable: true,
      select:false
    })
    contactNo:string;
    
    @Column({ 
      nullable: true
    })
    ownerName:string;
    
    @Column({ 
      nullable: true
    })
    ownerPhoneNumber:string;
    
    @Column({ 
      nullable: true,
      select:false
    })
    area:string;
    
    @Column({ 
      nullable: true
    })
    legalStatus:string;
    
    @Column({ 
      nullable: true
    })
    map:string;
    
    @Column({ 
      nullable: true
    })
    latitude:string;
    
    @Column({ 
      nullable: true
    })
    longitude:string;
    
    @Column({ 
      nullable: true,
      select:false
    })
    type:string;
    
    @Column({ 
      nullable: true
    })
    developerCompanyName:string;
    
    @Column({ 
      nullable: true,
      select:false
    })
    developerCompanyPhone:string;
    
    @Column({ 
      nullable: true,
      select: false
    })
    developerCompanyEmail:string;
    
    @Column({ 
      nullable: true,
      select: false
    })
    developerCompanyAddress:string;

    @Column("simple-array", { nullable: true, select: false })
    developerCompanyPhonePreviousProjects: string[];

    @Column("simple-array", { nullable: true, select: false })
    ownerPreviousProjects: string[];
    
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: 'timestamp', select: false })
    updatedAt!: Date;
}