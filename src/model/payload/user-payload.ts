import { Gender } from '@/model/gender';

export type CreateUserRequest = {
  username: string,
  email: string,
  ngaySinh: string,
  soDienThoai: string,
  coQuan: string,
  tenDayDu: string,
  gioiTinh: Gender,
  // image: string,
  ghiChu: string,
  idPhongBan: number
}


export type UpdateUserRequest = {}
