import { Body, Controller, Delete, Get, Param, Post, Render } from '@nestjs/common';
import { get } from 'http';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';
import { Csavar } from './csavar.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }

  @Get('api/csavarbolt')
  async listCsavar() {
    const boltRepo = this.dataSource.getRepository(Csavar);
    return await boltRepo.find();
  }

  @Post('api/csavarbolt')
  newCsavar(@Body() csavar: Csavar) {
    csavar.id = undefined;
    const boltRepo = this.dataSource.getRepository(Csavar);
    boltRepo.save(csavar);
  }

  @Delete('api/csavarbolt/:id')
  deleteCsavar(@Param('id') id: number) {
    const boltRepo = this.dataSource.getRepository(Csavar);
    boltRepo.delete(id);
  }
}
