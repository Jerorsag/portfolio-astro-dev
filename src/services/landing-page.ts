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
    
    // Log para debug
    console.log('🎯 Landing page API response:', {
      title: response.data.attributes.title,
      blocksCount: response.data.attributes.blocks.length,
      blockTypes: response.data.attributes.blocks.map(block => block.__component)
    });
    
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching landing page data:', error);
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

// Función helper para construir URL completa de imagen
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

// Función para obtener todos los proyectos de un ProjectBlock
export function getProjectsFromBlock(projectBlock: ProjectBlock) {
  return projectBlock.proyectos?.data || [];
}

// Función para obtener tecnologías únicas de todos los proyectos
export function getUniqueTechnologies(projectBlock: ProjectBlock) {
  const projects = getProjectsFromBlock(projectBlock);
  const allTechs = projects.flatMap(project => project.attributes.stackUsed || []);
  
  // Eliminar duplicados basado en el nombre
  const uniqueTechs = allTechs.filter((tech, index, self) => 
    index === self.findIndex(t => t.name === tech.name)
  );
  
  return uniqueTechs;
}

// Función para validar que un bloque tiene los datos requeridos
export function validateBlockData(block: Block): boolean {
  switch (block.__component) {
    case 'blocks.hero':
      const heroBlock = block as HeroBlock;
      return !!(heroBlock.heading && heroBlock.description);
      
    case 'blocks.about':
      const aboutBlock = block as AboutBlock;
      return !!(aboutBlock.heading && aboutBlock.description);
      
    case 'blocks.project':
      const projectBlock = block as ProjectBlock;
      return !!(projectBlock.heading && projectBlock.description);
      
    case 'blocks.contact':
      const contactBlock = block as ContactBlock;
      return !!(contactBlock.heading && contactBlock.description);
      
    default:
      return false;
  }
}