// src/services/global.ts
import { api } from '../utils/api';
import type { GlobalData } from '../types/global';

export async function getGlobalData(): Promise<GlobalData> {
  try {
    const response = await api<GlobalData>('/global');
    return response.data;
  } catch (error) {
    console.error('Error fetching global data:', error);
    throw new Error('Failed to fetch global layout data');
  }
}

// Función helper para construir URL completa de imagen
export function getImageUrl(url: string): string {
  const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}