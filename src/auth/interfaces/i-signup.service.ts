export interface SignupServiceInputDto {
  email: string;
  password: string;
}

export interface ISignupService {
  execute(params: SignupServiceInputDto): Promise<string>;
}
