export enum Gender {
  MALE = 0,
  FEMALE = 1,
}

export const getGenderName = (gender: Gender) =>{
  switch (gender) {
    case Gender.FEMALE:
      return 'Nữ';
    case Gender.MALE:
      return 'Nam';
  }
}
