import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';
import { GemLedgerController } from './gem-ledger.controller';
import { GemLedgerService } from './gem-ledger.service';
import { GemTransaction, GemTransactionSchema } from './gem-transaction.schema';

/**
 * 보석 장부. 보석을 주고 빼는 곳이 여러 모듈에 흩어져 있어서 @Global 로 둔다 —
 * 서비스는 GemLedgerService 를 생성자에 받기만 하면 된다.
 */
@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GemTransaction.name, schema: GemTransactionSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [GemLedgerController],
  providers: [GemLedgerService],
  exports: [GemLedgerService],
})
export class GemLedgerModule {}
