
export const metadata = {
  title:'Đăng nhập',
}

export default function Layout({
                                 children,
                               }: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-auth-background bg-cover bg-no-repeat text-white p-12 flex flex-col justify-between">
        <div>

          <h1 className="text-4xl font-bold mt-2">Quản lý vật dụng</h1>
        </div>

      </div>
      <div className="w-1/2 bg-white p-12 flex flex-col justify-center">
        <div className="mt-12">
          {children}
        </div>
      </div>
    </div>
  </>
}
