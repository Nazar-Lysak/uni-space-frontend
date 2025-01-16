import NextAuth from 'next-auth';
import { authConfig } from '@/app/config/auth';

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
