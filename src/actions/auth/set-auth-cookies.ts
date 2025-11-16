'use server';

import { revalidatePath } from 'next/cache';
import { User } from '../../interfaces';

interface AuthSuccessResponse {
  accessToken: string;
  refreshToken?: string;
  user: Partial<User>;
}

export const setAuthCookies = async ({ accessToken: token, refreshToken, user }: AuthSuccessResponse) => {

  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();

  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 2
  });

  if (refreshToken) {
    cookieStore.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7
    });

  }

  cookieStore.set('user', JSON.stringify(user), {
    httpOnly: false,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 2
  });

  revalidatePath('/');
  revalidatePath('/tutor/offers');
  revalidatePath('/student');

};