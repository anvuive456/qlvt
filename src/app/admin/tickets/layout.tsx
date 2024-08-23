import NavBar from '@/components/nav-bar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


export default function Layout({
                                 children,
                                 borrow_slip,
                                 return_slip,
                               }: Readonly<{
  children: React.ReactNode;
  borrow_slip: React.ReactNode;
  return_slip: React.ReactNode;
}>) {
  return <div className="hidden flex-col md:flex">
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Phiếu mượn/trả</h2>
      </div>
      <Tabs defaultValue='borrow_slip'>
        <TabsList>
          <TabsTrigger value="borrow_slip">Phiếu mượn</TabsTrigger>
          <TabsTrigger value="return_slip">Phiếu trả</TabsTrigger>
        </TabsList>
        <TabsContent value="borrow_slip">{borrow_slip}</TabsContent>
        <TabsContent value="return_slip">{return_slip}</TabsContent>
      </Tabs>
    </div>

  </div>;
}
