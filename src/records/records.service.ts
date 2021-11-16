import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dealer } from 'src/dealer/dealer.entity';
import { PlotFiles } from 'src/plot-files/plot-files.entity';
import { Repository } from 'typeorm';
import { RecordsDto } from './dto/records.dto';
import { Records } from './records.entity';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Records) private recordsRepo: Repository<Records>,
    @InjectRepository(PlotFiles) private plotFilesRepo: Repository<PlotFiles>,
  ) { }

  
  async getAll() {
    let record = await this.recordsRepo.find()
    return record
  }

  async getOne(id: number) {
    const record = await this.recordsRepo.findOne(id);
    if (!record) throw new NotFoundException('No record found');
    return record;
  }

  async getByFile(id: number) {
    return await this.recordsRepo.findOne({ where: { fileNo: id } });
  }
  
  async createFile(fileObj: PlotFiles, type:'ASSIGNMENT_CHANGE' | 'PRICE_CHANGE' ){
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
}
