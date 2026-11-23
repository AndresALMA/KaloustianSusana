import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChildren,
} from '@angular/core';
import { SiteContentService } from '../../core/site-content.service';
import { WhatsappIconComponent } from '../../shared/icons';

const SWAP_PAUSE_MS = 1700;
const OVERLAP_SECONDS = 1.5;

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [WhatsappIconComponent],
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  protected readonly content = inject(SiteContentService);
  protected readonly activeVideo = signal(0);
  protected readonly reducedMotion = signal(false);

  private readonly destroyRef = inject(DestroyRef);
  private readonly videoRefs = viewChildren<ElementRef<HTMLVideoElement>>('bgVideo');
  private readonly abortController = new AbortController();
  private videos: readonly HTMLVideoElement[] = [];
  private switching = false;
  private pauseTimer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    afterNextRender(() => this.initializeVideos());
    this.destroyRef.onDestroy(() => this.dispose());
  }

  private initializeVideos(): void {
    this.videos = this.videoRefs()
      .map((ref) => ref.nativeElement)
      .filter((video): video is HTMLVideoElement => video instanceof HTMLVideoElement);

    if (this.videos.length < 2 || this.prefersReducedMotion()) {
      this.reducedMotion.set(this.prefersReducedMotion());
      return;
    }

    this.tryPlay(this.currentVideo());

    const options: AddEventListenerOptions = {
      signal: this.abortController.signal,
      passive: true,
    };

    for (const video of this.videos) {
      video.addEventListener('timeupdate', () => this.handleTimeUpdate(video), options);
      video.addEventListener('ended', () => this.swap(video), options);
    }

    document.addEventListener(
      'visibilitychange',
      () => {
        if (document.visibilityState === 'visible') this.tryPlay(this.currentVideo());
      },
      options,
    );

    const resume = (): void => this.tryPlay(this.currentVideo());
    window.addEventListener('touchstart', resume, options);
    window.addEventListener('click', resume, options);
    window.addEventListener('scroll', resume, options);
  }

  private handleTimeUpdate(video: HTMLVideoElement): void {
    if (
      this.switching ||
      video !== this.currentVideo() ||
      !Number.isFinite(video.duration) ||
      video.duration <= 0
    ) {
      return;
    }

    if (video.duration - video.currentTime <= OVERLAP_SECONDS) {
      this.swap(video);
    }
  }

  private swap(from: HTMLVideoElement): void {
    if (this.switching || from !== this.currentVideo()) return;

    const nextIndex = (this.activeVideo() + 1) % this.videos.length;
    const next = this.videos[nextIndex];
    if (!next) return;

    this.switching = true;
    next.currentTime = 0;
    this.tryPlay(next);
    this.activeVideo.set(nextIndex);

    this.pauseTimer = setTimeout(() => {
      from.pause();
      this.switching = false;
    }, SWAP_PAUSE_MS);
  }

  private currentVideo(): HTMLVideoElement | undefined {
    return this.videos[this.activeVideo()];
  }

  private tryPlay(video: HTMLVideoElement | undefined): void {
    if (!video) return;
    video.muted = true;
    try {
      const playback = video.play();
      if (playback) void playback.catch(() => undefined);
    } catch {
      // Media playback is optional; the gradient background remains visible.
    }
  }

  private prefersReducedMotion(): boolean {
    try {
      return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    } catch {
      return false;
    }
  }

  private dispose(): void {
    this.abortController.abort();
    if (this.pauseTimer !== undefined) clearTimeout(this.pauseTimer);
    for (const video of this.videos) video.pause();
  }
}
