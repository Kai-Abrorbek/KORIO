import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';
import { EnergyService } from './energy.service';
import { EnergyController } from './energy.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [EnergyController],
  providers: [EnergyService],
  exports: [EnergyService],
})
export class EnergyModule {}
