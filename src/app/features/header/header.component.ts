import { Component, inject } from '@angular/core';
import { SiteContentService } from '../../core/site-content.service';
import { WhatsappIconComponent } from '../../shared/icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [WhatsappIconComponent],
  template: `
    <header class="site-header">
      <div class="wrap header-inner">
        <a class="brand" href="#inicio" [attr.aria-label]="brandLabel">
          <span class="brand-mark" aria-hidden="true">SK</span>
          <span class="brand-text">
            <span class="brand-name">{{ content.site.brand }}</span>
            <span class="brand-meta">
              {{ content.site.license }} · {{ content.site.location }}
            </span>
          </span>
        </a>

        <nav class="nav" aria-label="Principal">
          @for (item of content.site.nav; track item.href) {
            <a [href]="item.href">{{ item.label }}</a>
          }
          <a
            class="btn btn-primary btn-nav"
            [href]="content.whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <app-whatsapp-icon />
            Contactar
          </a>
        </nav>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  protected readonly content = inject(SiteContentService);
  protected readonly brandLabel = `${this.content.site.brand}, inicio`;
}
