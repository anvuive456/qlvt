import Link from 'next/link';
import { Button } from '../ui/button';

export type AddButtonProps = {
  disabled: boolean;
  linkOrFunction: string | (() => void);
};

export default function DataTableAddButton(props: AddButtonProps) {
  return (
    <Button
      disabled={props.disabled}
      variant='secondary'
      size='sm'
      className='hidden h-8 lg:flex'
      onClick={() => {
        if (typeof props.linkOrFunction == 'function') {
          props.linkOrFunction();
        }
      }}
    >
      {typeof props.linkOrFunction == 'function' ? (
        'Thêm'
      ) : (
        <Link href={props.linkOrFunction}>Thêm</Link>
      )}
    </Button>
  );
}
