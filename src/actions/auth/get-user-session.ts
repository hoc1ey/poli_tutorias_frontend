'use server';

import { cookies } from 'next/headers';
import { User } from '@/interfaces';

export const getUserSession = async (): Promise<Partial<User> | null> => {
  const cookieStore = await cookies();

  const userCookie = cookieStore.get('user');

  if (!userCookie || !userCookie.value || userCookie.value.trim() === '') {
    return null;
  }

  try {

    const user = JSON.parse(userCookie.value) as Partial<User>;
    return user;

  } catch (error) {

    console.error('Error parsing user cookie:', error);
    cookieStore.delete('user');
    return null;

  }
};
