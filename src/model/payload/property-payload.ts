export type PropertyResponse = {
  id: number;
  maTaiSan: string;
  image: string;
  loaiTaiSan: PropertyType;
  ghiChu: string;
  createdBy: string;
  updatedBy: string;
  tinhTrang: PropertyCondition,
  trangThai: PropertyStatus,
}


export type UpdatePropertyRequest =
  Omit<PropertyResponse, 'trangThai' | 'image' | 'createdBy' | 'updatedBy' | 'tinhTrang' | 'loaiTaiSan'>
  & {
  trangThai: 0 | 1;
  tinhTrang: 0 | 1;
  loaiTaiSan: 0 | 1;
}
export type CreatePropertyRequest = Omit<UpdatePropertyRequest, 'id'>

export enum PropertyType {
  DEFAULT = 'TAI_SAN_CO_DINH',
  TOOL = 'CONG_CU_DUNG_CU'
}

export enum PropertyStatus {
  AVAILABLE = 'KHONG',
  UNAVAILABLE = 'DANG_MUON',
}

export enum PropertyCondition {
  NORMAL = 'DUNG_DUOC',
  BROKEN = 'HU_HONG'
}


export const PropertyEnumRequest = {
  [PropertyType.DEFAULT]: 0,
  [PropertyType.TOOL]: 1,
  [PropertyStatus.AVAILABLE]: 0,
  [PropertyStatus.UNAVAILABLE]: 1,
  [PropertyCondition.NORMAL]: 0,
  [PropertyCondition.BROKEN]: 1,
} as const;
