'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useGetRecentQuery } from '@/hooks/api/dashboard';

const Tile = ({ amount, image, name, username }: {
  image?: string;
  name: string;
  username: string;
  amount: number;
}) => {
  return <>
    <div className="flex items-center ">
      <Avatar className="h-9 w-9">
        <AvatarImage src={image} alt="Avatar" />
        <AvatarFallback>OM</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{name}</p>
        <p className="text-sm text-muted-foreground">
          {username}
        </p>
      </div>
      <div className="ml-auto font-medium">Số lượng: {amount}</div>
    </div>
  </>;
};

export function RecentSales() {
  const { data } = useGetRecentQuery();


  return (
    <div className="space-y-8">
      {data && data.map(e => (
        <Tile key={e.nguoidung_id} image={e.image} name={e.ten_day_du} username={e.username}
              amount={Number(e.so_luong)} />),
      )
      }
    </div>
  );
}
