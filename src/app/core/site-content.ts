import { z } from 'zod';

const assetSchema = z
  .object({
    src: z.string().min(1),
    alt: z.string().min(1),
  })
  .readonly();

const navItemSchema = z
  .object({
    href: z.enum(['#inicio', '#servicios', '#contacto']),
    label: z.string().min(1),
  })
  .readonly();

const serviceSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1),
    summary: z.string().min(1),
    image: z.url(),
    alt: z.string().min(1),
    detail: z.string().min(1),
  })
  .readonly();

const siteSchema = z
  .object({
    brand: z.string().min(1),
    professionalName: z.string().min(1),
    title: z.string().min(1),
    license: z.string().min(1),
    location: z.string().min(1),
    tagline: z.string().min(1),
    description: z.string().min(1),
    email: z.email(),
    phoneDisplay: z.string().min(1),
    phoneTel: z.string().min(1),
    whatsappNumber: z.string().regex(/^\d+$/),
    whatsappMessage: z.string().min(1),
    photo: assetSchema,
    colegioLogo: assetSchema,
    nav: z.array(navItemSchema).readonly(),
    services: z.array(serviceSchema).readonly(),
    heroVideos: z.tuple([z.string().min(1), z.string().min(1)]).readonly(),
    contactBackground: z.string().min(1),
    contactIcons: z
      .object({
        whatsapp: z.string().min(1),
        email: z.string().min(1),
      })
      .readonly(),
  })
  .readonly();

export type SiteContent = z.infer<typeof siteSchema>;

export const resolveAsset = (path: string): string => new URL(path, document.baseURI).toString();

export const buildWhatsappUrl = (number: string, message: string): string =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

const rawContent: z.input<typeof siteSchema> = {
  brand: 'Estudio Inmobiliario Kaloustian Susana',
  professionalName: 'Susana Kaloustian',
  title: 'Martillera y Corredor Inmobiliario',
  license: 'M.P. N° 04-2435',
  location: 'Córdoba Capital',
  tagline:
    'Acompañamiento inmobiliario con respaldo profesional, criterio técnico y atención cercana en cada operación.',
  description:
    'En Estudio Inmobiliario Kaloustian, Susana Kaloustian —Martillera y Corredor Inmobiliario (M.P. N° 04-2435)— brinda asesoramiento claro y confiable en tasaciones judiciales, tasaciones particulares y administración de inmuebles en Córdoba Capital.',
  email: 'susanakaloustian@hotmail.com',
  phoneDisplay: '351 6816010',
  phoneTel: '+543516816010',
  whatsappNumber: '5493516816010',
  whatsappMessage: 'Hola Susana, vi su sitio web y me gustaría realizar una consulta.',
  photo: {
    src: resolveAsset('images/herosus.jpg'),
    alt: 'Susana Kaloustian, martillera y corredor inmobiliario',
  },
  colegioLogo: {
    src: resolveAsset('images/logo-cpcpi.svg'),
    alt: 'Logo del Colegio Profesional de Martilleros y Corredores Públicos de la Provincia de Córdoba',
  },
  nav: [
    { href: '#inicio', label: 'Inicio' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#contacto', label: 'Contacto' },
  ],
  services: [
    {
      id: 'tasaciones-judiciales',
      name: 'Tasaciones judiciales',
      summary:
        'Informes claros y fundamentados, elaborados con rigor técnico para respaldar procesos con seguridad y precisión.',
      image:
        'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80',
      alt: 'Documentos y firma de un informe profesional',
      detail: 'Rigor técnico y sustento sólido',
    },
    {
      id: 'tasaciones-particulares',
      name: 'Tasaciones particulares',
      summary:
        'Una valoración confiable para tomar decisiones patrimoniales importantes con información clara y criterio profesional.',
      image:
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
      alt: 'Entrega de llaves de una propiedad',
      detail: 'Claridad para decidir con confianza',
    },
    {
      id: 'administracion',
      name: 'Administración',
      summary:
        'Seguimiento cercano, comunicación transparente y organización en cada etapa para cuidar el patrimonio con tranquilidad.',
      image:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      alt: 'Edificios residenciales y comerciales modernos',
      detail: 'Tranquilidad y gestión responsable',
    },
  ],
  heroVideos: [
    resolveAsset('videospublic/Casa_en_campo_en_otoño_053568e1.mp4'),
    resolveAsset('videospublic/Modern_minimalist_house_panning_…_65de1142.mp4'),
  ],
  contactBackground: resolveAsset('images/contact-property.jpg'),
  contactIcons: {
    whatsapp: resolveAsset('images/contact-whatsapp.svg'),
    email: resolveAsset('images/contact-email.svg'),
  },
};

/**
 * Runtime validation at the content trust boundary. The object is local, but
 * Zod keeps the model honest if the copy or asset manifest is edited later.
 */
export const site: SiteContent = siteSchema.parse(rawContent);
