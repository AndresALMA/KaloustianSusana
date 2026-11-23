import { TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
    }).compileComponents();
  });

  it('renders the two local background videos and the primary copy', async () => {
    const fixture = TestBed.createComponent(HeroComponent);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;

    const videos = root.querySelectorAll<HTMLVideoElement>('video.hero-bg-video');
    expect(videos).toHaveLength(2);
    expect(videos[0]?.src).toContain('videospublic/');
    expect(videos[1]?.src).toContain('_scrub.mp4');
    expect(videos[0]?.muted).toBe(true);
    expect(videos[0]?.autoplay).toBe(true);
    expect(videos[0]?.getAttribute('poster')).toContain('images/hero-property.jpg');
    expect(root.querySelector('img.hero-fallback')).toBeNull();
    expect(root.querySelector('.hero > img')).toBeNull();
    expect(root.querySelector('.credential-card a[href*="cpmcp.org.ar"]')).not.toBeNull();

    expect(root.querySelector('h1')?.textContent).toContain('Susana Kaloustian');
    expect(root.querySelector('#inicio')).not.toBeNull();
  });

  it('starts with the first video active and no static-media override', async () => {
    const fixture = TestBed.createComponent(HeroComponent);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;

    const videos = root.querySelectorAll('video.hero-bg-video');
    expect(videos[0]?.classList.contains('is-active')).toBe(true);
    expect(videos[1]?.classList.contains('is-active')).toBe(false);
    expect(root.querySelector('.hero-bg-videos')?.classList.contains('is-static')).toBe(false);
  });

  it('disposes listeners and timers on destroy without throwing', async () => {
    const fixture = TestBed.createComponent(HeroComponent);
    await fixture.whenStable();
    expect(() => fixture.destroy()).not.toThrow();
  });
});
