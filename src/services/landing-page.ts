import { api } from '../utils/api';
import type { 
  LandingPageData, 
  Block, 
  HeroBlock, 
  AboutBlock, 
  ProjectBlock, 
  ContactBlock 
} from '../types/landing-page';

export async function getLandingPageData(): Promise<LandingPageData> {
  try {
    const response = await api<LandingPageData>('/landing-page');
    return response.data;
  } catch (error) {
    console.error('Error fetching landing page data:', error);
    throw new Error('Failed to fetch landing page data');
  }
}

// === HELPER FUNCTIONS PARA OBTENER BLOQUES ESPECÍFICOS ===

export function getHeroBlock(blocks: Block[]): HeroBlock | undefined {
  return blocks.find(block => block.__component === 'blocks.hero') as HeroBlock;
}

export function getAboutBlock(blocks: Block[]): AboutBlock | undefined {
  return blocks.find(block => block.__component === 'blocks.about') as AboutBlock;
}

export function getProjectBlock(blocks: Block[]): ProjectBlock | undefined {
  return blocks.find(block => block.__component === 'blocks.project') as ProjectBlock;
}

export function getContactBlock(blocks: Block[]): ContactBlock | undefined {
  return blocks.find(block => block.__component === 'blocks.contact') as ContactBlock;
}

// Función helper para construir URL completa de imagen (reutilizada de global)
export function getImageUrl(url: string): string {
  const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}

// === HELPER FUNCTIONS ADICIONALES PARA TRABAJAR CON LOS DATOS ===

// Ordenar categorías de tecnologías por displayOrder
export function sortTechCategoriesByOrder(categories: any[]) {
  return categories.sort((a, b) => a.displayOrder - b.displayOrder);
}

// Filtrar bloques por tipo
export function getBlocksByType<T extends Block>(blocks: Block[], componentType: string): T[] {
  return blocks.filter(block => block.__component === componentType) as T[];
}