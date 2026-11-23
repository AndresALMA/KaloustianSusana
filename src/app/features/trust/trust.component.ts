import { Component, inject } from '@angular/core';
import { SiteContentService } from '../../core/site-content.service';

@Component({
  selector: 'app-trust',
  standalone: true,
  templateUrl: './trust.component.html',
})
export class TrustComponent {
  protected readonly content = inject(SiteContentService);
}
