export interface IGetUserByIdRepository {
  execute(userId: string): Promise<boolean>;
}
