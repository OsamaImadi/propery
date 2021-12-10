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
export class Roles extends PaginateableBaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ 
      nullable: false
    })
    userId:string;

    @Column({ 
      nullable: false
    })
    userType:string;

    @Column({ 
      nullable: true,
      default: false
    })
    endUserRegistration:boolean;

    @Column({ 
      nullable: true,
      default: false
    })
    employeeRegistration:boolean;

    @Column({ 
      nullable: true,
      default: false
    })
    dealerRegistration:boolean;

    @Column({ 
      nullable: true,
      default: false
    })
    singleFileAddition:boolean;

    @Column({ 
      nullable: true,
      default: false
    })
    bulkFileAddition:boolean;

    @Column({ 
      nullable: true,
      default: false
    })
    fileUpdateWithoutPrice:boolean;

    @Column({ 
      nullable: true,
      default: false
    })
    fileUpdateWithPrice:boolean;

    @Column({ 
      nullable: true,
      default: false
    })
    fileDeletion:boolean;

    @Column({ 
      nullable: true,
      default: false
    })
    singleFileTransfer:boolean;

    @Column({ 
      nullable: true,
      default: false
    })
    bulkFileTransfer:boolean;

    @Column({ 
      nullable: true,
      default: false
    })
    singleFileView:boolean;

    @Column({ 
      nullable: true,
      default: false
    })
    filesGridViewLoginUser:boolean;

    @Column({ 
      nullable: true,
      default: false
    })
    filesGridViewAnyUser:boolean;

    @Column({ 
      nullable: true,
      default: false
    })
    assignedHistoryLoginUser:boolean;

    @Column({ 
      nullable: true,
      default: false
    })
    assignedHistoryAnyUser:boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: 'timestamp', select: false })
    updatedAt!: Date;
}