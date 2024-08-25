import { MeResponse } from '@/model/payload/auth-payload';
import { PropertyResponse } from '@/model/payload/property-payload';
import { RoomResponse } from '@/model/payload/room-payload';

export type SlipResponse = {
  id: number,
  lyDo: string,
  nguoiDung: MeResponse,
  taiSan: PropertyResponse,
  phongHop: RoomResponse,
  ngayMuon: number,
  ngayTra: number,
  trangThaiDuyet: SlipStatus,
  loaiMuon: SlipType,
  ghiChu: string,
}

export type ReturnSlipResponse = {
  id: number;
  phieuMuon: SlipResponse;
  ngayTra: number | null;
  hanTra: number;
  trangThaiTra: ReturnSlipStatus;
  ghiChu: string;
}

//"0: CHUA_TRA; 1: DA_TRA ; 2: QUA_HAN"
export enum ReturnSlipStatus {
  UNDONE = 'CHUA_TRA',
  DONE = 'DA_TRA',
  OVERDUE = 'QUA_HAN'
}

export const ReturnSlipStatusRequest = {
  [ReturnSlipStatus.DONE]: 1,
  [ReturnSlipStatus.OVERDUE]: 2,
  [ReturnSlipStatus.UNDONE]: 0,
} as const;

export enum SlipType {
  ROOM = 'PHONG',
  PROPERTY = 'TAI_SAN_THIET_BI'
}

//"0: CHO_DUYET; 1: KHONG_DUYET ; 2: DA_DUYET"
export enum SlipStatus {
  PENDING = 'CHO_DUYET',
  ACCEPTED = 'DA_DUYET',
  UNACCEPTED = 'KHONG_DUYET'
}

export const SlipStatusRequest = {
  [SlipStatus.PENDING]: 0,
  [SlipStatus.ACCEPTED]: 2,
  [SlipStatus.UNACCEPTED]: 1,
} as const;

export type SlipRequest = {
  lyDo: string;
  ngayMuon: string;
  ngayTra: string;
  ghiChu: string;
} & {
  idPhongHop: number;
} | {
  idTaiSan: number;
}
