import { Gender } from '@/model/gender';
import { DepartmentResponse } from '@/model/payload/department-payload';

export interface SignUpRequest {
  username: string;
  password: string;
  email: string;
  dob: string;
  phone: string;
  org: string;
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
  roles: string[];
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
  phongBan: DepartmentResponse | null;
  roles: { id: string; ten: string; }[];

}
