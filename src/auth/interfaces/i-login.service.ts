export interface LoginServiceInputDto {
  email: string;
  password: string;
}

export interface ILoginService {
  execute(params: LoginServiceInputDto): Promise<string>;
}
