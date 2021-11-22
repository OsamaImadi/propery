import { 
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlotFilesDto } from './dto/plotFiles.dto';
import { UpdatePlotFilesDto } from './dto/updatePlotFiles.dto';
import { PlotFiles } from './plot-files.entity';
import { Admin } from './../admin/admin.entity';
import { FileNotes } from './file-note.entity';
import { NotesDto } from './dto/note.dto';
import { RecordsService } from 'src/records/records.service';
import { PaginationParams } from '@tfarras/nestjs-typeorm-pagination';
import { Dealer } from './../dealer/dealer.entity';
import { User } from './../user/user.entity';
import { Records } from 'src/records/records.entity';
var XLSX = require('xlsx');

@Injectable()
export class PlotFilesService {
  constructor(
    @InjectRepository(PlotFiles) private plotFilesRepo: Repository<PlotFiles>,
    @InjectRepository(Admin) private adminRepo: Repository<Admin>,
    @InjectRepository(Dealer) private dealerRepo: Repository<Dealer>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(FileNotes) private fileNotesRepo: Repository<FileNotes>,
  ) { }
  private recordsService: RecordsService
  async getAll() {
    let record = await this.plotFilesRepo.find()
    return record
  }

  async createFileRecord(fileObj: PlotFiles, type:'ASSIGNMENT_CHANGE' | 'PRICE_CHANGE' ){
    try{
      let file = await this.plotFilesRepo.findOne({where:{fileNo: fileObj.fileNo}})
      if(!file) throw new NotFoundException('File not found')
      let newFile = Records.create({
        fileNo: file.fileNo,
        type: type,
        fileObject: file
      });
      await newFile.save()
      
      return newFile;
    }catch(err){
      if(err.errno==1062){
        throw new ConflictException('File already exists')
      }
      if(err.errno==1364){
        throw new BadRequestException(err.message)
      }
      if(err.code==23505){
        throw new ConflictException(err.message)
      }
      throw new InternalServerErrorException(err.message)
    }
  }

  ExcelDateToJSDate(serial) {
    var utc_days  = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;                                        
    var date_info = new Date(utc_value * 1000);
 
    var fractional_day = serial - Math.floor(serial) + 0.0000001;
 
    var total_seconds = Math.floor(86400 * fractional_day);
 
    var seconds = total_seconds % 60;
 
    total_seconds -= seconds;
 
    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;
 
    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
  }

  async getOne(id: number) {
    const file = await this.plotFilesRepo.findOne(id);
    if (!file) throw new NotFoundException('No record found');
    return file;
  }

  async getNotesByFile(id: number) {
    return await this.fileNotesRepo.find({where:{fileNo: id}});
  }
  
  async createNote(notes: NotesDto){
    try{

      let assignee = await this.adminRepo.findOne(notes.createdBy)
      if(!assignee){
        throw new NotFoundException('creator not found')
      }

      let file = await this.plotFilesRepo.findOne({where: {fileNo: notes.fileNo}})
      if(!file){
        throw new NotFoundException('file not found')
      }

      const note = new FileNotes();

      note.fileNo = notes.fileNo;
      note.createdBy = ""+assignee.id;
      note.note = notes.note;
      
      let newNote = await this.fileNotesRepo.save(note);
      
      return newNote;
    }catch(err){
      if(err.errno==1062){
        throw new ConflictException('Note already exists')
      }
      if(err.errno==1364){
        throw new BadRequestException(err.message)
      }
      if(err.code==23505){
        throw new ConflictException(err.message)
      }
      throw new InternalServerErrorException(err.message)
    }

  }

  async createFile(file: PlotFilesDto){
    try{
      let issuer:`user` | 'admin' | 'dealer' = 'admin', recieving:`user` | 'admin' | 'dealer' = 'admin'
      let assignee:any = await this.adminRepo.findOne(file.assignedTo)
      if(!assignee){
        assignee = await this.dealerRepo.findOne(file.recievedBy)
        issuer='dealer'
        if(!assignee){
          assignee = await this.userRepo.findOne(file.recievedBy)
          issuer = 'user'
        }
        if(!assignee){
        throw new NotFoundException('Assignee not found')
      }
    }

      let reciever:any = await this.adminRepo.findOne(file.recievedBy)
      if(!reciever){
        reciever = await this.dealerRepo.findOne(file.recievedBy)
        recieving = 'dealer'
        if(!reciever){
          reciever = await this.userRepo.findOne(file.recievedBy)
          recieving = 'user'
        }
        if(!reciever){
          throw new NotFoundException('Reciever found')
        }
      }

      const plot = new PlotFiles();

      plot.projectName = file.projectName;
      plot.assignedDate = file.assignedDate;
      plot.assignedTo = file.assignedTo;
      plot.recievedBy = file.recievedBy;
      plot.recievedDate = file.recievedDate;
      plot.companyName = file.companyName;
      plot.fileNo = file.fileNo;
      plot.fileSecurityNo = file.fileSecurityNo;
      plot.fileType = file.fileType;
      plot.status = file.status;
      plot.unitPrice = file.unitPrice;
      plot.minimumRequiredDeposit = file.minimumRequiredDeposit;
      plot.discountPercentage = file.discountPercentage;
      plot.depositPercentage = file.depositPercentage;
      plot.lastfileAssigner = issuer;
      plot.lastfileReciever = recieving
      
      let newFile = await this.plotFilesRepo.save(plot);
      
      return newFile;
    }catch(err){
      if(err.errno==1062){
        throw new ConflictException('File already exists')
      }
      if(err.errno==1364){
        throw new BadRequestException(err.message)
      }
      if(err.code==23505){
        throw new ConflictException(err.message)
      }
      throw new InternalServerErrorException(err.message)
    }

  }

  async updateFile(file: UpdatePlotFilesDto, id:number){
    try{
      let issuer: string, recieving: string;
      if(file.assignedTo){
          
          let assignee:any = await this.adminRepo.findOne(file.assignedTo)
          issuer='admin'
          if(!assignee){
            assignee = await this.dealerRepo.findOne(file.recievedBy)
            issuer='dealer'
            if(!assignee){
              assignee = await this.userRepo.findOne(file.recievedBy)
              issuer = 'user'
            }
            if(!assignee){
            throw new NotFoundException('Assignee not found')
          }
        }
      }
      if(file.recievedBy){
        let reciever:any = await this.adminRepo.findOne(file.recievedBy)
        recieving = 'admin'
        if(!reciever){
          reciever = await this.dealerRepo.findOne(file.recievedBy)
          recieving = 'dealer'
          if(!reciever){
            reciever = await this.userRepo.findOne(file.recievedBy)
            recieving = 'user'
          }
          if(!reciever){
            throw new NotFoundException('Reciever found')
          }
        }
      }
      let fileExisiting = await this.plotFilesRepo.findOne(id)
      if(!fileExisiting){
        throw new NotFoundException('No record found')
      }
      await this.plotFilesRepo.update(
        id,
        {...file, lastfileAssigner: issuer, lastfileReciever: recieving}
      );

      let updatedFile = await this.plotFilesRepo.findOne(id)

      await this.createFileRecord(updatedFile, 'ASSIGNMENT_CHANGE')

      return await this.plotFilesRepo.findOne(id);   

    }catch(err){
      if(err.errno==1062){
        throw new ConflictException('Admin already exists')
      }
      if(err.errno==1364){
        throw new BadRequestException(err.message)
      }
      if(err.code==23505){
        throw new ConflictException(err.message)
      }
      throw new InternalServerErrorException(err.message)
    }
  }

  async bulkAssignFiles(pg:PaginationParams, assignmentInfo: UpdatePlotFilesDto){
    try{
      let plotFiles = await PlotFiles.findAndPaginate(pg)
      let ids = [];
      plotFiles.data.forEach(file=>{
        ids.push(file.id)
      })

      let files = []
      console.log(ids)
      for (let i=0; i<ids.length; i++){
        let file = await this.plotFilesRepo.findOne(ids[i].id)

            file.projectName= assignmentInfo.projectName || file.projectName,
            file.assignedDate= assignmentInfo.assignedDate || file.assignedDate,
            file.assignedTo= assignmentInfo.assignedTo || file.assignedTo,
            file.recievedBy= assignmentInfo.recievedBy || file.recievedBy,
            file.recievedDate= assignmentInfo.recievedDate || file.recievedDate,
            file.companyName= assignmentInfo.companyName || file.companyName,
            file.fileNo= assignmentInfo.fileNo || file.fileNo,
            file.fileSecurityNo= assignmentInfo.fileSecurityNo || file.fileSecurityNo,
            file.fileType= assignmentInfo.fileType || file.fileType,
            file.status= assignmentInfo.status || file.status,
            file.unitPrice= assignmentInfo.unitPrice || file.unitPrice,
            file.minimumRequiredDeposit= assignmentInfo.minimumRequiredDeposit || file.minimumRequiredDeposit,
            file.discountPercentage= assignmentInfo.discountPercentage || file.discountPercentage,
            file.depositPercentage= assignmentInfo.depositPercentage || file.depositPercentage,

            await file.save()

        await this.createFileRecord(file, 'ASSIGNMENT_CHANGE')
        files.push(file)
      }
        return files;


    }catch(err){
      console.log(err)
      if(err.errno==1062){
        throw new ConflictException('Admin already exists')
      }
      if(err.errno==1364){
        throw new BadRequestException(err.message)
      }
      if(err.code==23505){
        throw new ConflictException(err.message)
      }
      throw new InternalServerErrorException(err.message)
    }
  }

  async upload(file:any){
    try{
      var workbook = XLSX.read(file.buffer, {type:'buffer'});
      var sheetNames = workbook.SheetNames;
  
      var sheetIndex = 1;
      var df = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[sheetIndex-1]]);
      df.forEach(function(e: { [x: string]: any; }, i: string | number) {
        Object.keys(e).forEach(function(key) {
          var val = e[key],
            newKey = key.replace(/\s+/g, '_');
          delete df[i][key];
          df[i][newKey] = val;
          
        });
      });
  
      df.forEach(async (element: { [x: string]: any; Issued_To: any; Received_By: any; Security_Code: any; File_Type: any; Project_Name: any; Status: any; Issued_Date: any; Received_Date: any; Company: any; Unit_Price: any; Minimum_Deposit: any; }) => {
        let userIssued:any;
        let userRecieved:any;
        let issuer:`user` | 'admin' | 'dealer' = 'admin', reciever:`user` | 'admin' | 'dealer' = 'admin'
        userIssued = await this.adminRepo.findOne({where:{phoneNo: element.Issued_To}})
        if(!userIssued){
          userIssued = await this.dealerRepo.findOne({where:{phoneNo: element.Issued_To}})
          issuer='dealer'
          if(!userIssued){
            userIssued = await this.userRepo.findOne({where:{phoneNo: element.Issued_To}})
            issuer='user'
            if(!userIssued){
              throw new NotFoundException(`No user with phone number: ${element.Issued_To}`)
            }
          }
        }
  
        userRecieved = await this.adminRepo.findOne({where:{phoneNo: element.Received_By}})
        if(!userRecieved){
          userRecieved = await this.dealerRepo.findOne({where:{phoneNo: element.Received_By}})
          if(!userRecieved){
            userRecieved = await this.userRepo.findOne({where:{phoneNo: element.Received_By}})
            if(!userRecieved){
              throw new NotFoundException(`No User with phone number: ${element.Received_By}`)
            }
          }
        }

        let dateIssued = this.ExcelDateToJSDate(element.Issued_Date)
        let dateReceived = this.ExcelDateToJSDate(element.Received_Date)
  
        let file = {
          fileNo: element[`File_No.`],
          fileSecurityNo: element.Security_Code,
          fileType: element.File_Type,
          projectName: element.Project_Name,
          status: element.Status,
          assignedTo: userIssued.id,
          assignedDate: `${dateIssued}`,
          recievedBy: userRecieved.id,
          recievedDate: `${dateReceived}`,
          companyName: element.Company,
          unitPrice: element.Unit_Price,
          minimumRequiredDeposit: element.Minimum_Deposit,
          lastfileAssigner: issuer,
          lastfileReciever: reciever

        }
  
        let newFile = PlotFiles.create(file);
        await newFile.save()
      });
  
      return 'files added successfully'
    }catch(err){
      throw err
    }
    
  }

  async deleteFile(id:number){
    try{
      let fileExisiting = await this.plotFilesRepo.findOne(id)
      if(!fileExisiting){
        throw new NotFoundException('No record found')
      }
      let deleted = await this.plotFilesRepo.delete(id);
      if(deleted.affected){
        return 'File deleted successfully'
      }
    }catch(err){
      throw err
    }
  }
  
  async truncate(): Promise<void> {
    return await this.plotFilesRepo.clear();
  }
}
