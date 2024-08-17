import { format } from 'date-fns';

export enum DateFormatTypes {
  DD_MM_YYYY = 'dd/MM/yyyy',

}

export const formatDate = (date: Date, formatter: DateFormatTypes) =>{
  return format(date, formatter);
}
