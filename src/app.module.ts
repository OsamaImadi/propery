import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlotFilesModule } from './plot-files/plot-files.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealerModule } from './dealer/dealer.module';
import { DealModule } from './deal/deal.module';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';
import { PlotFiles } from './plot-files/plot-files.entity';
import { Dealer } from './dealer/dealer.entity';
import { Admin } from './admin/admin.entity';
import { User } from './user/user.entity';

dotenv.config();

@Module({
  imports: [
    PlotFilesModule,
    AdminModule,
    AuthModule,
    DealerModule,
    DealModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRESQL_DB,
      entities: [
        __dirname + '/**/*.entity{.ts,.js}',
      ],
      synchronize: true
    }
    ),
    TypeOrmModule.forFeature([PlotFiles, Dealer, Admin, User]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
