import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { createNamespace } from 'cls-hooked';
import { DataSource } from 'typeorm';

@Injectable()
export class SetTransactionMiddleware implements NestMiddleware {
  constructor(private dataSource: DataSource) {}
  use(_req: Request, _res: Response, next: NextFunction): void {
    const namespace = createNamespace('transaction');

    return namespace.run(async () => {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction('REPEATABLE READ');
      namespace.set('queryRunner', queryRunner);
      return next();
    });
  }
}
