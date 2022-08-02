export interface UserModel {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export interface SuggestRequestQueryModel {
  loginSubstring?: string;
  limit?: number;
}

export type CreateUserModel = Pick<UserModel, 'login' | 'password' | 'age'>;
export type UpdateUserModel = Omit<UserModel, 'isDeleted'>;
export type RemoveUserModel = Pick<UserModel, 'id'>;
export type LoginUserModel = Pick<UserModel, 'login' | 'password'>;

export interface SuggestUserModel {
  loginSubstring: string;
  limit: number;
}
