/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: ()=>{
    return [
      {
        source: '/',
        destination: '/auth/login',
        permanent: true,
      },{
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: true,
      },
    ]
  }
};

export default nextConfig;
