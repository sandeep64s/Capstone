export interface entryType {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  dob: string;
  password: string;
  isActive: Boolean;
  token: string;
}

export type User = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  dob: string;
  password: string;
  isActive: boolean;
};

export type loginResponseType = {
  userValidated: boolean;
  passwordValidated: boolean;
  userDeleted: boolean;
};

export type signupResponseType = {
  userAllowed: boolean;
  emailAllowed: boolean;
};

export type InitialStateType = {
  loading: boolean;
  data: User[];
  error: string;
  currentUser: User;
  loginResponse: loginResponseType;
};

export interface checkPassType {
  cpass: string;
  same: boolean;
}

export interface loginType {
  username: string;
  password: string;
}

