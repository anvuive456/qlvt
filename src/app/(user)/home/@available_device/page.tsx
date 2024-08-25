'use client';
import { useState } from 'react';
import { DataTable } from '@/components/table/data-table';
import { userPropertiesColumn } from '@/app/(user)/home/@available_device/_reusable/columns';
import { ColumnFiltersState, PaginationState } from '@tanstack/react-table';
import { useSearchPropertiesQuery } from '@/hooks/api/property';
import {
  PropertyCondition,
  PropertyEnumRequest,
  PropertyResponse,
  PropertyStatus,
} from '@/model/payload/property-payload';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { DateFormatTypes, formatDate } from '@/lib/date-utls';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { useCreatePropertySlipMutation } from '@/hooks/api/slip';
import { toast } from 'sonner';

const FormSchema = z.object({
  lyDo: z.string(),
  ngayMuon: z.date(),
  ngayTra: z.date(),
  ghiChu: z.string(),
});

export default function Page() {
  const [property, setProperty] = useState<PropertyResponse>();

  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [filterState, setFilterState] = useState<ColumnFiltersState>([]);
  const { data } = useSearchPropertiesQuery({
    page: paginationState?.pageIndex || 0,
    size: paginationState.pageSize,
    ...filterState.reduce<{ [k: string]: string }>((acc, item) => {
      acc[item.id] = item.value as string;
      return acc;
    }, {}),
    status: PropertyStatus.AVAILABLE,
    condition: PropertyCondition.NORMAL,
  });

  const form = useForm<z.infer<typeof FormSchema>>(
    {
      resolver: zodResolver(FormSchema),
    },
  );

  const [createSlip, result] = useCreatePropertySlipMutation();

  const handleSubmit = (values: z.infer<typeof FormSchema>) => {
    createSlip({
      lyDo: values.lyDo,
      ngayMuon: values.ngayMuon.toISOString(),
      ngayTra: values.ngayTra.toISOString(),
      ghiChu: values.ghiChu,
      idTaiSan: property!.id,
    }).unwrap().then(value => {
      form.reset();
      toast.success('Tạo phiếu mượn thành công');
    }).finally(() => {
      setProperty(undefined);
    });
  };

  return <>
    <div>
      <DataTable
        tableOptions={{
          rowCount: data?.totalElements,
          pageCount: data?.totalPages,
          onPaginationChange: setPaginationState,
          onColumnFiltersChange: setFilterState,
          state: {
            columnFilters: filterState,
            pagination: paginationState,
          },
        }}
        getIdFromRow={row => row.id}
        filterCol="maTaiSan"
        columns={userPropertiesColumn({
          onAction: setProperty,
        })}
        data={data?.content || []}
      />
    </div>

    <Dialog open={!!property} onOpenChange={open => open ? null : setProperty(undefined)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tạo phiếu mượn {property?.maTaiSan}</DialogTitle>
          <DialogDescription>Tạo phiếu mượn trước 7 ngày</DialogDescription>
        </DialogHeader>
        <Form  {...form}>
          <form id="hook-form" onSubmit={form.handleSubmit(handleSubmit)} className="gap-2 flex flex-col">
            <FormField render={
              ({ field }) => (
                <FormItem>
                  <FormLabel>Lý do</FormLabel>
                  <FormControl>
                    <Input placeholder={'Lý do'} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            } name="lyDo" />
            <FormField render={
              ({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Ngày mượn</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            formatDate(field.value, DateFormatTypes.DD_MM_YYYY)
                          ) : (
                            <span>Chọn ngày</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => {
                          const today = new Date();
                          let nextWeek = today;
                          nextWeek.setDate(nextWeek.getDate() + (7 - today.getDay()));
                          return date < nextWeek;
                        }
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )
            } name="ngayMuon" />
            <FormField render={
              ({ field, formState, fieldState }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Ngày trả</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            formatDate(field.value, DateFormatTypes.DD_MM_YYYY)
                          ) : (
                            <span>Chọn ngày</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => {
                          const ngayMuon = form.getValues('ngayMuon');
                          if (!ngayMuon) return true;

                          const minDate = new Date(ngayMuon.getTime());
                          minDate.setDate(ngayMuon.getDate() + 1);
                          return date < minDate;
                        }
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )
            } name="ngayTra" />
            <FormField render={
              ({ field }) => (
                <FormItem>
                  <FormLabel>Ghi chú</FormLabel>
                  <FormControl>
                    <Input placeholder={'Ghi chú'} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            } name="ghiChu" />
          </form>
        </Form>
        <DialogFooter>
          <Button form="hook-form" type="submit">Tạo phiếu</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>;
}
