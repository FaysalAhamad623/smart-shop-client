import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith('/login') || 
                       req.nextUrl.pathname.startsWith('/register');
    const isAdminPage = req.nextUrl.pathname.startsWith('/admin');
    
    // If user is on auth page and already logged in, redirect to products
    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL('/products', req.url));
    }

    // If user is trying to access admin page without admin role
    if (isAdminPage && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/products', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isAuthPage = req.nextUrl.pathname.startsWith('/login') || 
                          req.nextUrl.pathname.startsWith('/register');
        const isProtectedPage = req.nextUrl.pathname.startsWith('/admin') ||
                               req.nextUrl.pathname.startsWith('/cart');

        // Allow access to auth pages
        if (isAuthPage) {
          return true;
        }

        // Protect admin and cart pages
        if (isProtectedPage) {
          return !!token;
        }

        // Allow all other pages
        return true;
      },
    },
  }
);

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    '/admin/:path*',
    '/cart/:path*',
    '/login',
    '/register',
  ],
};
