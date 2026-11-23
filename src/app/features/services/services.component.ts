import { Component, inject } from '@angular/core';
import { SiteContentService } from '../../core/site-content.service';

@Component({
  selector: 'app-services',
  standalone: true,
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  private readonly content = inject(SiteContentService);

  protected readonly services = this.content.site.services.map((service, index) => ({
    ...service,
    index: String(index + 1).padStart(2, '0'),
  }));
}
