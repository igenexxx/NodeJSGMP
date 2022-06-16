export interface UserModel {
  id?: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export interface SuggestRequestQueryModel {
  loginSubstring?: string;
  limit?: number;
}
