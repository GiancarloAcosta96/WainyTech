export interface IUser {
  userId: string;
  name: string;
  userName: string;
  oldPassword: string;
  email?: string;
  phoneNumber?: string;
  password: string;
  notification: boolean;
}
