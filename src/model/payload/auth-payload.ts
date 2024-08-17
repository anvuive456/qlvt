import { Gender } from '@/model/gender';

export interface SignUpRequest {
  username: string;
  password: string;
  email: string;
  dob: string;
  phone: string;
  department: string;
  fullName: string;
  gender: Gender;
  role: 'user' | 'admin';
}

export interface SignInRequest {
  username: string;
  password: string;
}

export interface SignInResponse {
  accessToken: string;
}

export interface SignUpResponse {
  message: string;
}
