import { format, parse } from 'date-fns';

export enum DateFormatTypes {
  DD_MM_YYYY = 'dd/MM/yyyy',

}

export const formatDate = (date: Date, formatter: DateFormatTypes) =>{
  return format(date, formatter);
}

 export const parseDate = (date: string, formatter: DateFormatTypes = DateFormatTypes.DD_MM_YYYY) => {
   return parse(date, formatter, new Date())
 }
