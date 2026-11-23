import { Component, inject } from '@angular/core';
import { SiteContentService } from '../../core/site-content.service';
import {
  LicenseIconComponent,
  LocationIconComponent,
  MailIconComponent,
  WhatsappIconComponent,
} from '../../shared/icons';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    WhatsappIconComponent,
    MailIconComponent,
    LicenseIconComponent,
    LocationIconComponent,
  ],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  protected readonly content = inject(SiteContentService);
}
