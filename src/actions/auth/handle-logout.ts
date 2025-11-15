'use server';

import { LogoutResponse } from '@/interfaces';
import { clearAuthCookies } from './clear-auth-cookies';
import { fetchApi } from '../fetchApi';

interface LogoutResult {
  success: boolean;
  message?: string;
  errorCode?: string;
}

export const handleLogout = async (): Promise<LogoutResult> => {
  try {
    const response = await fetchApi('/auth/logout', {
      method: 'POST',
    });

    const data: LogoutResponse = await response.json();

    if (data.success) {
      await clearAuthCookies();

      return {
        success: true,
        message: data.data.message
      };
    } else {

      return {
        success: false,
        message: data.message,
        errorCode: data.errorCode
      };
    }
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    return {
      success: false,
      message: 'Error de conexión al cerrar sesión',
      errorCode: 'NETWORK_ERROR'
    };
  }
};
