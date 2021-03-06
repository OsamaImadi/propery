import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { PlotFilesService } from './plot-files.service';
import { PlotFilesDto } from './dto/plotFiles.dto';
import { UpdatePlotFilesDto } from './dto/updatePlotFiles.dto';
import { PlotFiles } from './plot-files.entity';
import { PgParams, PaginationParams, Pagination } from '@tfarras/nestjs-typeorm-pagination';
import { NotesDto } from './dto/note.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { NotesBulkDto } from './dto/notes.bulk.dto';

@Controller('plot-files')
export class PlotFilesController {
  constructor(private service: PlotFilesService) { }

  @Get()
  async getMany(
  ) {
    return await this.service.getAll();
  }

  @Get('bulk')
  async getBulkPaginated(
    @PgParams() pg: PaginationParams,
    @Body(ValidationPipe) file: UpdatePlotFilesDto
  ){
    return await this.service.bulkAssignFiles(pg,file)
  }

  @Get('paginated')
  getPaginated(
    @PgParams() pg: PaginationParams,
  ): Promise<Pagination<PlotFiles>> {
    pg._limit = pg._limit || 25;
    pg._start = pg._start || 0;
    pg._sortBy = pg._sortBy || 'id';
    pg._order = pg._order || 'DESC';
    return PlotFiles.findAndPaginate(pg);
  }
 
  @Get('notes/parsed')
  getNotesbyFileIdParsed(@Query() query
  ) {
    return this.service.getNotesByFileNoParsed(query);
  }
 
  @Get('notes')
  getNotesbyFileId(@Query() query
  ) {
    return this.service.getNotesByFileNo(query);
  }
 
  @Get('notes/:id')
  getNotesbyId(@Param() params
  ) {
    return this.service.getNotesByFile(params.id);
  }
 
  @Get(':id')
  getbyId(@Param() params
  ) {
    return this.service.getOne(params.id);
  }

  @Post('/notes')
  createNote(
    @Body(ValidationPipe) note: NotesDto
  ) {
    return this.service.createNote(note);
  }

  @Post('/notes/bulk')
  createNotesBulk(
    @Body(ValidationPipe) note: NotesBulkDto
  ) {
    return this.service.createNotesByArray(note);
  }
  
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    return await this.service.upload(file)
  }
  
  @Post('bulk-assign')
  async bulkAssign(
    @Body(ValidationPipe) file: UpdatePlotFilesDto,
    @PgParams() pg: PaginationParams
    ) {
      pg._limit = pg._limit || 25;
      pg._start = pg._start || 0;
      pg._sortBy = pg._sortBy || 'id';
      pg._order = pg._order || 'DESC';
    return await this.service.bulkAssignFiles(pg,file)
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

  @Delete('clear')
  turncate() {
    return this.service.truncate();
  }

  @Delete('/:id')
  delete(
    @Param() params
  ) {
    return this.service.deleteFile(params.id);
  }

}
