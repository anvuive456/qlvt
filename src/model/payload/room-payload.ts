export type RoomResponse = {
  id: number;
  tenPhongHop: string;
  ghiChu: string;
  trangThai: RoomStatus,
  tinhTrang: RoomCondition,
}

export type UpdateRoomRequest = Omit<RoomResponse, 'tinhTrang' | 'trangThai'> & {
  tinhTrang: 0 | 1,
  trangThai: 0 | 1,
}

export type CreateRoomRequest = Omit<RoomResponse, 'id'|'tinhTrang' | 'trangThai'> & {
  tinhTrang: 0 | 1,
  trangThai: 0 | 1,
}

export enum RoomStatus {
  AVAILABLE = 'TRONG',
  UNAVAILABLE = 'DANG_MUON',
}

export enum RoomCondition {
  NORMAL = 'HOAT_DONG_TOT',
  MAINTAINING = 'DANG_BAO_TRI'
}

export const RoomStatusRequest = {
  [RoomStatus.UNAVAILABLE]: 1,
  [RoomStatus.AVAILABLE]: 0,
} as const;

export const RoomConditionRequest = {
  [RoomCondition.NORMAL]: 1,
  [RoomCondition.MAINTAINING]: 0,
} as const;
