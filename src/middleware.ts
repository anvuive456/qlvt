import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = [
  '/'
]

export async function middleware(request: NextRequest) {

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
