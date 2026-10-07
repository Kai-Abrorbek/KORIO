import type { DynamicModule, Type } from '@nestjs/common';
jest.mock('../../users/schemas/user.schema', () => ({
  User: class User {},
  UserSchema: {},
}));
jest.mock('../admin.module', () => ({ AdminModule: class AdminModule {} }));
jest.mock('../admin-audit.service', () => ({
  AdminAuditService: class AdminAuditService {},
}));
jest.mock('../../lessons/schemas/question.schema', () => ({
  QuestionType: new Proxy({}, { get: (_, key: string) => key.toLowerCase() }),
}));

import { MODULE_METADATA } from '@nestjs/common/constants';
import { JwtModule } from '@nestjs/jwt';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { AppSettingsModule } from '../../app-settings/app-settings.module';
import { SupportModule } from '../../support/support.module';
import { User } from '../../users/schemas/user.schema';

type ImportedModule = DynamicModule | Type<unknown>;

const importsOf = (module: Type<unknown>): ImportedModule[] =>
  (Reflect.getMetadata(MODULE_METADATA.IMPORTS, module) as ImportedModule[]) ??
  [];

describe('AdminGuard host module dependencies', () => {
  it.each([AppSettingsModule, SupportModule])(
    '%s provides JWT and UserModel for its admin controller guard',
    (module) => {
      const imports = importsOf(module);
      expect(
        imports.some(
          (entry) => typeof entry === 'object' && entry.module === JwtModule,
        ),
      ).toBe(true);
      expect(
        imports.some(
          (entry) =>
            typeof entry === 'object' &&
            entry.module === MongooseModule &&
            entry.providers?.some(
              (provider) =>
                typeof provider === 'object' &&
                provider !== null &&
                'provide' in provider &&
                provider.provide === getModelToken(User.name),
            ),
        ),
      ).toBe(true);
    },
  );
});
