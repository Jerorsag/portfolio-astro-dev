// src/types/global.ts

// Tipos para medios/imágenes de Strapi
export interface StrapiMedia {
  data: {
    id: number;
    attributes: {
      alternativeText: string;
      url: string;
    };
  } | null;
}

// Tipos para enlaces/links
export interface Link {
  id: number;
  href: string;
  label: string;
  isExternal: boolean;
}

// Tipo para elementos de navegación
export interface NavItem {
  id: number;
  label: string;
  href: string;
}

// Tipo para enlaces sociales
export interface SocialLink {
  id: number;
  label: string;
  href: string;
  icon: StrapiMedia;
}

// Tipo para logos
export interface Logo {
  id: number;
  label: string;
  href: string;
  icon: StrapiMedia;
}

// Componente Banner
export interface Banner {
  id: number;
  isVisible: boolean;
  description: string;
  link: Link;
}

// Componente Header
export interface Header {
  id: number;
  logo: Logo;
  navItems: NavItem[];
  socialLinks: SocialLink[];
}

// Componente Footer
export interface Footer {
  id: number;
  text: string;
  logo: Logo[];
  navItems: NavItem[];
  socialLinks: SocialLink[];
}

// Estructura completa del Global Single Type
export interface GlobalData {
  id: number;
  attributes: {
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    banner: Banner;
    header: Header;
    footer: Footer;
  };
}