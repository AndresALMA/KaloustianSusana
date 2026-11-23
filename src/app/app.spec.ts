import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App (Opción 1 isolated SPA)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('creates the root component', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders only the five Opción 1 sections in order', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;

    const sections = Array.from(root.querySelectorAll('main > *')).map((node) =>
      node.tagName.toLowerCase(),
    );
    expect(sections).toEqual(['app-hero', 'app-trust', 'app-services', 'app-contact']);
    expect(root.querySelector('app-header')).not.toBeNull();
    expect(root.querySelector('app-footer')).not.toBeNull();
  });

  it('exposes the real SPA anchors and no option-selector controls', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;

    const hrefs = Array.from(root.querySelectorAll('a[href^="#"]')).map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('#inicio');
    expect(hrefs).toContain('#respaldo');
    expect(hrefs).toContain('#servicios');
    expect(hrefs).toContain('#contacto');
    expect(hrefs.some((href) => href === '#perfil')).toBe(false);

    expect(root.textContent).not.toContain('Opción 2');
    expect(root.textContent).not.toContain('Opción 3');
    expect(root.querySelector('form')).toBeNull();
  });

  it('exposes CPMCP data and no link to the other professional association', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    const footer = root.querySelector('.site-footer');

    expect(footer).not.toBeNull();
    expect(root.querySelectorAll('a[href*="cpicordoba.org.ar"]')).toHaveLength(0);
    expect(footer?.querySelector('a[href*="cpmcp.org.ar"]')).not.toBeNull();
    expect(footer?.textContent).toContain('Marco legal CPMCP');
    expect(footer?.textContent).toContain('Honorarios mínimos');
    expect(footer?.textContent).toContain('M.P. N° 04-2435');
    expect(footer?.textContent).toContain('a completar');
  });

  it('shows a single professional data block in contact and a standalone trust section', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;

    expect(root.querySelector('app-trust #respaldo')).not.toBeNull();
    expect(root.querySelector('app-trust')?.textContent).toContain('CPMCP');
    expect(root.querySelector('.contact-panel')?.textContent).toContain('Datos profesionales');
    expect(root.querySelector('.contact-panel')?.textContent).toContain('Zona de atención');
    expect(root.querySelector('.contact-panel')?.textContent).toContain('a completar');
  });

  it('keeps WhatsApp and mailto links without a backend form', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;

    const wa = Array.from(root.querySelectorAll<HTMLAnchorElement>('a[href]')).filter((a) =>
      a.href.startsWith('https://wa.me/'),
    );
    const mail = Array.from(root.querySelectorAll<HTMLAnchorElement>('a[href]')).filter((a) =>
      a.href.startsWith('mailto:'),
    );
    expect(wa.length).toBeGreaterThan(0);
    expect(mail.length).toBeGreaterThan(0);
    expect(wa.every((a) => a.target === '_blank' && a.rel.includes('noopener'))).toBe(true);
  });
});
