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

@Injectable()
export class PlotFilesService {
  constructor(
    @InjectRepository(PlotFiles) private plotFilesRepo: Repository<PlotFiles>,
    @InjectRepository(Admin) private adminRepo: Repository<Admin>,
    @InjectRepository(FileNotes) private fileNotesRepo: Repository<FileNotes>,
  ) { }
  private recordsService: RecordsService
  async getAll() {
    let record = await this.plotFilesRepo.find()
    return record
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

      let assignee = await this.adminRepo.findOne(file.assignedTo)
      if(!assignee){
        throw new NotFoundException('Assignee not found')
      }

      let reciever = await this.adminRepo.findOne(file.recievedBy)
      if(!reciever){
        throw new NotFoundException('Reciever found')
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
      if(file.assignedTo){
        let assignee = await this.adminRepo.findOne(file.assignedTo)
        if(!assignee){
          throw new NotFoundException('Assignee not found')
        }
      }
      if(file.recievedBy){
        let reciever = await this.adminRepo.findOne(file.recievedBy)
        if(!reciever){
          throw new NotFoundException('Reciever found')
        }
      }
      let fileExisiting = await this.plotFilesRepo.findOne(id)
      if(!fileExisiting){
        throw new NotFoundException('No record found')
      }
      await this.plotFilesRepo.update(
        id,
        file
      );

      let updatedFile = await this.plotFilesRepo.findOne(id)

      await this.recordsService.createFile(updatedFile, 'ASSIGNMENT_CHANGE')

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
      ids.forEach(async (id)=>{
        let fileUpdated = await this.plotFilesRepo.update(
          id,
          assignmentInfo
        );
        let file = await this.plotFilesRepo.findOne(id)
        await this.recordsService.createFile(file, 'ASSIGNMENT_CHANGE')
        files.push(file)
      })

      return files;

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
}
