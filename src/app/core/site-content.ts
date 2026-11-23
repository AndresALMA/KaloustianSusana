import { z } from 'zod';

const assetSchema = z
  .object({
    src: z.string().min(1),
    alt: z.string().min(1),
  })
  .readonly();

const navItemSchema = z
  .object({
    href: z.enum(['#inicio', '#respaldo', '#servicios', '#contacto']),
    label: z.string().min(1),
  })
  .readonly();

const serviceSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1),
    summary: z.string().min(1),
    image: z.string().min(1),
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
    // El domicilio profesional se muestra como 'a completar' hasta que se confirme la dirección real.
    domicilio: z.string(),
    cpmcpVerificationUrl: z.url(),
    legalNotice: z.string().min(1),
    legalLinks: z
      .array(
        z
          .object({
            label: z.string().min(1),
            href: z.url(),
          })
          .readonly(),
      )
      .readonly(),
    trust: z
      .object({
        eyebrow: z.string().min(1),
        heading: z.string().min(1),
        lead: z.string().min(1),
        verificationLabel: z.string().min(1),
      })
      .readonly(),
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
    heroPoster: assetSchema,
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
  domicilio: 'a completar ',
  cpmcpVerificationUrl: 'https://vpn.cpmcp.org.ar/movil/Buscar_Colegiado_Publico.asp',
  legalNotice:
    'Los honorarios se convienen por escrito antes de la operación, conforme a los honorarios profesionales mínimos vigentes del CPMCP. La intermediación es realizada por la profesional matriculada responsable del estudio.',
  legalLinks: [
    { label: 'Marco legal CPMCP', href: 'https://cpmcp.org.ar/institucional/#marcolegal' },
    {
      label: 'Honorarios mínimos',
      href: 'https://cpmcp.org.ar/honorarios-profesionales-minimos-vigentes/',
    },
  ],
  trust: {
    eyebrow: 'Respaldo profesional',
    heading: 'Una profesional matriculada detrás de cada operación',
    lead: 'La matrícula M.P. N° 04-2435 acredita que Susana Kaloustian está habilitada por el Colegio Profesional de Martilleros y Corredores Públicos de la Provincia de Córdoba (CPMCP) para intervenir en operaciones inmobiliarias. Podés verificar el dato en el padrón oficial del CPMCP.',
    verificationLabel: 'Verificar matrícula en el CPMCP',
  },
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
    src: resolveAsset('images/logo-cpmcp.svg'),
    alt: 'Logo del Colegio Profesional de Martilleros y Corredores Públicos de la Provincia de Córdoba',
  },
  nav: [
    { href: '#inicio', label: 'Inicio' },
    { href: '#respaldo', label: 'Respaldo' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#contacto', label: 'Contacto' },
  ],
  services: [
    {
      id: 'tasaciones-judiciales',
      name: 'Tasaciones judiciales',
      summary:
        'Informes de valoración destinados a procesos judiciales, con la documentación y el sustento técnico que requiere cada expediente.',
      image: 'images/service-tasaciones-judiciales.jpg',
      alt: 'Documentos y firma de un informe profesional',
      detail: 'Informes para procesos judiciales',
    },
    {
      id: 'tasaciones-particulares',
      name: 'Tasaciones particulares',
      summary:
        'Valoración de inmuebles para operaciones de compra, venta o alquiler, con el detalle necesario para tomar una decisión patrimonial.',
      image: 'images/service-tasaciones-particulares.jpg',
      alt: 'Entrega de llaves de una propiedad',
      detail: 'Valoración para decisiones patrimoniales',
    },
    {
      id: 'administracion',
      name: 'Administración',
      summary:
        'Gestión y seguimiento de inmuebles: coordinación de propietarios e inquilinos, organización documental y comunicación de novedades.',
      image: 'images/service-administracion.jpg',
      alt: 'Edificios residenciales y comerciales modernos',
      detail: 'Gestión y seguimiento de inmuebles',
    },
  ],
  heroVideos: [
    resolveAsset('videospublic/Casa_en_campo_en_otoño_053568e1.mp4'),
    resolveAsset('videospublic/Modern_minimalist_house_panning_…_65de1142.mp4'),
  ],
  heroPoster: {
    src: resolveAsset('images/hero-property.jpg'),
    alt: 'Vista de una propiedad residencial',
  },
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
