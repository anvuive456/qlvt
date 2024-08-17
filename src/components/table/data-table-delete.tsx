import { Table } from '@tanstack/react-table';
import { Button } from '../ui/button';

interface DataTableDeleteProp<TData, IdType> {
  table: Table<TData>;
  onDelete: (ids: IdType[]) => void;
  getIdFromRow: (row: TData) => IdType;
}

export default function DataTableDeleteButton<TData, IdType>(
  props: DataTableDeleteProp<TData, IdType>
) {
  const selectedRowCount = props.table.getSelectedRowModel().rows.length;
  if (!selectedRowCount) return <></>;

  let title = '';
  if (props.table.getIsAllRowsSelected()) {
    title = 'Xoá hết';
  } else {
    title = `Xoá ${selectedRowCount} dòng`;
  }

  return (
    <Button
      variant='destructive'
      size='sm'
      className='hidden h-8 lg:flex'
      onClick={() => {
        props.onDelete(
          props.table
            .getSelectedRowModel()
            .rows.map((e) => props.getIdFromRow(e.original))
        );
      }}
    >
      {title}
    </Button>
  );
}
