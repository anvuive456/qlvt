import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import UserHeader from '@/app/(user)/home/_reusable/user-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const metadata = {
  title: 'Trang của ngừoi dùng',
};

export default function Layout({
                                 available_device,
                                 available_room,
                                 my_slip
                               }: Readonly<{
  children: React.ReactNode;
  my_slip: React.ReactNode;
  available_device: React.ReactNode;
  available_room: React.ReactNode;
}>) {
  return <>
    <UserHeader/>
    <Tabs defaultValue='available_device' className="mx-10">
      <TabsList>
        <TabsTrigger value='available_device' >Tài sản</TabsTrigger>
        <TabsTrigger value='available_room' >Phòng</TabsTrigger>
        <TabsTrigger value='my_slip' >Phiếu mượn</TabsTrigger>
      </TabsList>
      <TabsContent value="available_device">{available_device}</TabsContent>
      <TabsContent value="available_room">{available_room}</TabsContent>
      <TabsContent value="my_slip">{my_slip}</TabsContent>
    </Tabs>
  </>;
}
