import { Injectable } from '@angular/core';
import { buildWhatsappUrl, site, type SiteContent } from './site-content';

@Injectable({ providedIn: 'root' })
export class SiteContentService {
  readonly site: SiteContent = site;
  readonly whatsappUrl = buildWhatsappUrl(site.whatsappNumber, site.whatsappMessage);
  readonly mailtoUrl = `mailto:${site.email}`;
  readonly phoneTelUrl = `tel:${site.phoneTel}`;
}
