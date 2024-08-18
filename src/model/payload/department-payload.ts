export type DepartmentResponse = {
  id: number;
  tenPhongBan: string;
  tenVietTat: string;
  ghiChu: string;
}

export type DepartmentRequest = Omit<DepartmentResponse, 'id'>;
