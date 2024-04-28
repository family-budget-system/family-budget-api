import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { TransactionModule } from './transaction/transaction.module';
import { BillModule } from './bill/bill.module';
import { CommonModule } from './common/common.module';
import { ReferenceValuesModule } from './reference-values/reference-values.module';
import { ReferenceBookModule } from './reference-book/reference-book.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        entities: [__dirname + '/**/*.entity.{ts,js}'],
      }),
      inject: [ConfigService],
    }),
    CategoryModule,
    TransactionModule,
    AuthModule,
    UserModule,
    BillModule,
    CommonModule,
    ReferenceValuesModule,
    ReferenceBookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
