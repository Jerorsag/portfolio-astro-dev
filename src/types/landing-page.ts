// Tipos base para medios/imágenes de Strapi
export interface StrapiMedia {
  data: {
    id: number;
    attributes: {
      alternativeText: string;
      url: string;
      name?: string;
      mime?: string;
      size?: number;
    };
  } | null;
}

// Tipo para enlaces/links
export interface Link {
  id: number;
  href: string;
  label: string;
  isExternal: boolean;
  isButtonLink: boolean;
  type: 'PRIMARY' | 'SECONDARY';
}

// Tipo para soft skills
export interface SoftSkill {
  id: number;
  name: string;
}

// Tipo para tecnologías
export interface Technology {
  id: number;
  name: string;
  icon: StrapiMedia;
}

// Tipo para categorías de tecnologías
export interface TechCategory {
  id: number;
  categoryName: string;
  displayOrder: number;
  technologies: Technology[];
}

// Tipo para enlaces de proyectos
export interface ProjectLink {
  id: number;
  href: string;
  label: string;
}

// Tipo para imágenes de proyectos
export interface ProjectImage {
  id: number;
  image: StrapiMedia;
}

// Tipo para proyectos individuales
export interface Project {
  id: number;
  attributes: {
    title: string;
    description: string;
    stackUsed: Technology[];
    image: ProjectImage[];
    linksProject: ProjectLink[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// Tipo para la colección de proyectos
export interface ProjectsCollection {
  data: Project[];
}

// === BLOQUES DINÁMICOS ===

// Bloque Hero
export interface HeroBlock {
  __component: 'blocks.hero';
  id: number;
  heading: string;
  description: string;
  links: Link[];
  image: StrapiMedia;
}

// Bloque About
export interface AboutBlock {
  __component: 'blocks.about';
  id: number;
  heading: string;
  subtitle: string;
  description: string;
  softSkills: SoftSkill[];
  techCategories: TechCategory[];
}

// Bloque Project
export interface ProjectBlock {
  __component: 'blocks.project';
  id: number;
  heading: string;
  description: string;
  proyectos: ProjectsCollection;
}

// Bloque Contact
export interface ContactBlock {
  __component: 'blocks.contact';
  id: number;
  heading: string;
  description: string;
  hubspotFormId: string;
  successMessage: string;
}

// Union type para todos los bloques
export type Block = HeroBlock | AboutBlock | ProjectBlock | ContactBlock;

// Estructura completa de la Landing Page (coincide con la respuesta de tu API)
export interface LandingPageData {
  id: number;
  attributes: {
    title: string;
    description: string;
    blocks: Block[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// Tipo para la respuesta completa de la API
export interface LandingPageApiResponse {
  data: LandingPageData;
  meta: Record<string, any>;
}