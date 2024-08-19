import NavBar from '@/components/nav-bar';
import { ScrollArea } from '@/components/ui/scroll-area';

export const metadata = {
  title: 'Trang quản trị',
};

export default function Layout({
                                 children,
                               }: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
    <div className=" flex-row h-screen w-full flex ">
      <NavBar />
      <ScrollArea className="p-4 w-4/5 h-screen">
        {children}
      </ScrollArea>
    </div>
  </>;
}
