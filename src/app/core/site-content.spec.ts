import { site, buildWhatsappUrl, resolveAsset } from './site-content';

describe('site content trust boundary', () => {
  it('parses and freezes the validated content', () => {
    expect(site.professionalName).toBe('Susana Kaloustian');
    expect(site.license).toBe('M.P. N° 04-2435');
    expect(Object.isFrozen(site)).toBe(true);
  });

  it('contains only the three real SPA sections in navigation', () => {
    expect(site.nav.map((item) => item.href)).toEqual(['#inicio', '#servicios', '#contacto']);
  });

  it('exposes the three Opción 1 services with unique ids', () => {
    const ids = site.services.map((service) => service.id);
    expect(ids).toEqual(['tasaciones-judiciales', 'tasaciones-particulares', 'administracion']);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('builds an encoded WhatsApp link with no other contact backend', () => {
    const url = buildWhatsappUrl('5493516816010', 'Hola Susana, ¿cómo estás?');
    expect(url).toBe('https://wa.me/5493516816010?text=Hola%20Susana%2C%20%C2%BFc%C3%B3mo%20est%C3%A1s%3F');
  });

  it('resolves local assets against the app base', () => {
    expect(resolveAsset('images/susana.jpeg')).toContain('images/susana.jpeg');
    expect(site.heroVideos).toHaveLength(2);
    expect(site.heroVideos.every((src) => src.includes('videospublic/'))).toBe(true);
  });

  it('uses the professional title without the word Publico', () => {
    expect(site.title).toBe('Martillera y Corredor Inmobiliario');
    expect(site.description).toContain(
      '—Martillera y Corredor Inmobiliario (M.P. N° 04-2435)—',
    );
    expect(site.photo.alt).toBe('Susana Kaloustian, martillera y corredor inmobiliario');
    expect(JSON.stringify(site).toLowerCase()).not.toContain('corredor público');
  });

  it('uses the newly provided hero portrait', () => {
    expect(site.photo.src).toContain('images/herosus.jpg');
  });

  it('uses the updated brand name with Susana', () => {
    expect(site.brand).toBe('Estudio Inmobiliario Kaloustian Susana');
  });
});
