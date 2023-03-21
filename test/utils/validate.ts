import { validate } from 'class-validator';

export const _validate = async (dto: object) => {
  return await validate(dto, { skipMissingProperties: true });
};
