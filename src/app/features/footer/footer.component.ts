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
          <p class="footer-meta">Domicilio profesional: {{ content.site.domicilio }}</p>
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
        <div class="footer-credential">
          <a
            [href]="content.site.cpmcpVerificationUrl"
            target="_blank"
            rel="noopener noreferrer"
            [attr.aria-label]="'Verificar la matrícula ' + content.site.license + ' en el CPMCP'"
          >
            <img
              [src]="content.site.colegioLogo.src"
              [alt]="content.site.colegioLogo.alt"
              width="64"
              height="64"
              loading="lazy"
            />
          </a>
          <span>Profesional matriculada</span>
        </div>
      </div>
      <div class="wrap footer-bottom">
        <p class="footer-legal">{{ content.site.legalNotice }}</p>
        <p class="footer-legal-links">
          @for (link of content.site.legalLinks; track link.href) {
            <a [href]="link.href" target="_blank" rel="noopener noreferrer">{{ link.label }}</a>
          }
        </p>
        <span>© {{ year }} {{ content.site.professionalName }}. Todos los derechos reservados.</span>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  protected readonly content = inject(SiteContentService);
  protected readonly year = new Date().getFullYear();
}
