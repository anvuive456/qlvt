import NavBar from '@/components/nav-bar';

export default function Layout({
                                 children,
                               }: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
    <div className=" flex-row h-screen w-full flex ">
      <NavBar/>
      <section className='p-4 w-4/5 '>
         {children}
       </section>
    </div>
  </>;
}
