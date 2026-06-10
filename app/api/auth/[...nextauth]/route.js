import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const authOptions = {
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),

    // Credentials Provider (for email/password login)
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {


          // If not mock, try database authentication
          const response = await axios.post(`${API_URL}/auth/login`, {
            email: credentials.email,
            password: credentials.password
          }, {
            withCredentials: true
          });

          if (response.data.success && response.data.data) {
            return {
              id: response.data.data.id,
              email: response.data.data.email,
              name: response.data.data.name,
              role: response.data.data.role,
              avatar: response.data.data.avatar,
              token: response.data.token,
              isMock: false
            };
          }

          return null;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.avatar = user.avatar;
        token.isMock = user.isMock;
        if (user.token) {
          token.backendToken = user.token;
        }
      }

      // Google OAuth
      if (account?.provider === 'google') {
        token.role = 'user'; // Default role for Google users
        token.isMock = false;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.avatar = token.avatar;
        session.user.isMock = token.isMock;
        if (token.backendToken) {
          session.user.backendToken = token.backendToken;
        }
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      // Redirect to products page after successful login
      if (url === baseUrl || url === `${baseUrl}/api/auth/signin`) {
        return `${baseUrl}/products`;
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,

  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
