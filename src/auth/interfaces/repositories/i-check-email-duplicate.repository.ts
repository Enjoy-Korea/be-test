export interface ICheckEmailDuplicateRepository {
  execute(email: string): Promise<boolean>;
}
