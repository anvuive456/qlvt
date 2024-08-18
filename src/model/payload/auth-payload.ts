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

export interface MeResponse {
  id: number;
  email: string;
  username: string;
  soDienThoai: string;
  ngaySinh: string;
  tenDayDu: string;
  coQuan: string;
  gioiTinh: string;
  image: string;
  ghiChu: string;
  phongBan: string;
  roles: { id: string; ten: string; }[];

}
