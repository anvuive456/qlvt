import { Gender } from '@/model/gender';

export interface User {
  id: number;
  username: string;
  dob: string;
  phone: string;
  email: string;
  fullName: string;
  gender: Gender;
  image: string;
  roles: string[];
}
