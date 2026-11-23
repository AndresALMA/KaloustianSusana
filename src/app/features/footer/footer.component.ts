import { Component, inject } from '@angular/core';
import { SiteContentService } from '../../core/site-content.service';
import { LocationIconComponent, MailIconComponent, WhatsappIconComponent } from '../../shared/icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [WhatsappIconComponent, MailIconComponent, LocationIconComponent],
  template: `
    <footer class="site-footer">
      <div class="wrap footer-grid">
        <div class="footer-brand">
          <p class="footer-name">{{ content.site.brand }}</p>
          <p class="footer-meta">{{ content.site.title }}</p>
          <p class="footer-meta">{{ content.site.license }}</p>
        </div>
        <div class="footer-contact">
          <a [href]="content.whatsappUrl" target="_blank" rel="noopener noreferrer">
            <app-whatsapp-icon />
            {{ content.site.phoneDisplay }}
          </a>
          <a [href]="content.mailtoUrl">
            <app-mail-icon />
            {{ content.site.email }}
          </a>
          <span>
            <app-location-icon />
            {{ content.site.location }}
          </span>
        </div>
      </div>
      <div class="wrap footer-bottom">
        <span>© {{ year }} {{ content.site.professionalName }}. Todos los derechos reservados.</span>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  protected readonly content = inject(SiteContentService);
  protected readonly year = new Date().getFullYear();
}
