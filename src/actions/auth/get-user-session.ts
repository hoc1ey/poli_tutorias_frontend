'use server';

import { cookies } from 'next/headers';
import { User } from '@/interfaces';

export const getUserSession = async (): Promise<Partial<User> | null> => {
  try {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get('user');

    if (!userCookie || !userCookie.value || userCookie.value.trim() === '') {
      console.log('[getUserSession] No user cookie found');
      return null;
    }

    const user = JSON.parse(userCookie.value) as Partial<User>;
    console.log('[getUserSession] User session retrieved:', user.email);
    return user;

  } catch (error) {
    console.error('[getUserSession] Error parsing user cookie:', error);
    try {
      const cookieStore = await cookies();
      cookieStore.delete('user');
    } catch (deleteError) {
      console.error('[getUserSession] Error deleting invalid cookie:', deleteError);
    }
    return null;
  }
};
