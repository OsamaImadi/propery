import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { PlotFilesService } from './plot-files.service';
import { PlotFilesDto } from './dto/plotFIles.dto';
import { UpdatePlotFilesDto } from './dto/updatePlotFiles.dto';

@Controller('plot-files')
export class PlotFilesController {
  constructor(private service: PlotFilesService) { }

  @Get()
  async getMany(
  ) {
      return await this.service.getAll();
  }
 
  @Get(':id')
  getbyId(@Param() params
  ) {
    return this.service.getOne(params.id);
  }

  @Post('')
  create(
    @Body(ValidationPipe) file: PlotFilesDto
  ) {
    return this.service.createFile(file);
  }

  @Put('/:id')
  update(
    @Body(ValidationPipe) file: UpdatePlotFilesDto,
    @Param() params
  ) {
    return this.service.updateFile(file, params.id);
  }

  @Delete('/:id')
  delete(
    @Param() params
  ) {
    return this.service.deleteFile(params.id);
  }

}
