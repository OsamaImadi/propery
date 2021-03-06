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
import { RecordsModule } from './records/records.module';
import { RolesModule } from './roles/roles.module';
import { SocietyModule } from './society/society.module';
import { TransactionsModule } from './transactions/transactions.module';
import { InvoiceModule } from './invoice/invoice.module';
import { AllotmentLetterModule } from './allotment-letter/allotment-letter.module';
import { PaymentPlanModule } from './payment-plan/payment-plan.module';

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
      url: process.env.DATABASE_URL,
      entities: [
        __dirname + '/**/*.entity{.ts,.js}',
      ],
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      },
      synchronize: true
    }
    ),
    TypeOrmModule.forFeature([PlotFiles, Dealer, Admin, User]),
    RecordsModule,
    RolesModule,
    SocietyModule,
    TransactionsModule,
    InvoiceModule,
    AllotmentLetterModule,
    PaymentPlanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
