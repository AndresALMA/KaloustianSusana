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

  private readonly destroyRef = inject(DestroyRef);
  private readonly videoRefs = viewChildren<ElementRef<HTMLVideoElement>>('bgVideo');
  private readonly abortController = new AbortController();
  private videos: readonly HTMLVideoElement[] = [];
  private readonly failedVideos = new Set<HTMLVideoElement>();
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

    if (this.videos.length < 2) return;

    this.tryPlay(this.currentVideo());

    const options: AddEventListenerOptions = {
      signal: this.abortController.signal,
      passive: true,
    };

    for (const video of this.videos) {
      video.addEventListener('loadeddata', () => this.retryIfCurrent(video), options);
      video.addEventListener('canplay', () => this.retryIfCurrent(video), options);
      video.addEventListener('error', () => this.handleVideoError(video), options);
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
    window.addEventListener('pointerdown', resume, options);
    window.addEventListener('touchstart', resume, options);
    window.addEventListener('click', resume, options);
    window.addEventListener('scroll', resume, options);
  }

  private retryIfCurrent(video: HTMLVideoElement): void {
    if (video === this.currentVideo() && !this.failedVideos.has(video)) this.tryPlay(video);
  }

  private handleVideoError(video: HTMLVideoElement): void {
    if (this.failedVideos.has(video)) return;
    this.failedVideos.add(video);
    if (video !== this.currentVideo() || this.switching) return;

    const nextIndex = (this.activeVideo() + 1) % this.videos.length;
    const next = this.videos[nextIndex];
    if (!next || this.failedVideos.has(next)) return;

    this.activeVideo.set(nextIndex);
    this.tryPlay(next);
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

  private dispose(): void {
    this.abortController.abort();
    if (this.pauseTimer !== undefined) clearTimeout(this.pauseTimer);
    for (const video of this.videos) video.pause();
  }
}
