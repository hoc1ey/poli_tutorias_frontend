'use server';

import { cookies } from 'next/headers';
import { User } from '@/interfaces';

export const getUserSession = async (): Promise<Partial<User> | null> => {
  try {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get('user');

    if (!userCookie || !userCookie.value || userCookie.value.trim() === '') {
      return null;
    }

    const user = JSON.parse(userCookie.value) as Partial<User>;
    return user;

  } catch (error) {
    try {
      const cookieStore = await cookies();
      cookieStore.delete('user');
    } catch (deleteError) {
    }
    return null;
  }
};
