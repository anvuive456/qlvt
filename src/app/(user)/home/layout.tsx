import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import UserHeader from '@/app/(user)/home/_reusable/user-header';

export const metadata = {
  title: 'Trang của ngừoi dùng',
};

export default function Layout({
                                 available_device,
                                 borrowed_device,
                                 rent_room,
                                 available_room,
                               }: Readonly<{
  children: React.ReactNode;
  available_device: React.ReactNode;
  borrowed_device: React.ReactNode;
  rent_room: React.ReactNode;
  available_room: React.ReactNode;
}>) {
  return <>
    <UserHeader/>
    <div className="h-screen grid grid-cols-2 gap-4 p-10 ">
      <Card>
        <CardHeader>
          <CardTitle>Thiết bị đang mượn</CardTitle>
        </CardHeader>
        <CardContent>
          {borrowed_device}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Thiết bị có thể mượn <Button className='mx-2 ' variant={'outline'} size={'sm'}>Mượn</Button></CardTitle>
        </CardHeader>
        <CardContent>
          {available_device}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Phòng đang mượn</CardTitle>
        </CardHeader>
        <CardContent>
          {rent_room}

        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            Phòng có thể mượn
            <Button className='mx-2 ' variant={'outline'} size={'sm'}>Mượn</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {available_room}
        </CardContent>
      </Card>
    </div>
  </>;
}
