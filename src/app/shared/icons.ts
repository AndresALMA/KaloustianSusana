import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp-icon',
  standalone: true,
  template: `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.52 3.48A11.94 11.94 0 0 0 12.02 0C5.4 0 .02 5.38.02 12c0 2.12.55 4.19 1.6 6.02L0 24l6.14-1.6A11.95 11.95 0 0 0 12.02 24C18.64 24 24 18.62 24 12c0-3.2-1.24-6.21-3.48-8.52ZM12.02 21.8c-1.83 0-3.62-.49-5.18-1.42l-.37-.22-3.64.95.97-3.55-.24-.37A9.77 9.77 0 0 1 2.22 12c0-5.4 4.4-9.8 9.8-9.8 2.62 0 5.08 1.02 6.93 2.88A9.73 9.73 0 0 1 21.82 12c0 5.4-4.4 9.8-9.8 9.8Zm5.37-7.34c-.29-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.29-.76.96-.93 1.16-.17.2-.34.22-.63.07-.29-.15-1.24-.46-2.36-1.46-.87-.77-1.46-1.73-1.63-2.02-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.52-.07-.15-.66-1.59-.91-2.18-.24-.58-.49-.5-.66-.5h-.57c-.2 0-.52.07-.79.37-.27.29-1.04 1.01-1.04 2.46 0 1.45 1.06 2.85 1.21 3.05.15.2 2.09 3.19 5.06 4.48.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.08 1.74-.71 1.99-1.4.25-.69.25-1.28.17-1.4-.07-.12-.27-.2-.56-.34Z" /></svg>`,
})
export class WhatsappIconComponent {}

@Component({
  selector: 'app-mail-icon',
  standalone: true,
  template: `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" /></svg>`,
})
export class MailIconComponent {}

@Component({
  selector: 'app-license-icon',
  standalone: true,
  template: `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2 3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4Zm0 2.18 7 3.12v4.7c0 4.54-3.06 8.84-7 10-3.94-1.16-7-5.46-7-10V7.3l7-3.12Zm-1 10.82L7.5 11.5l1.41-1.41L11 12.17l4.09-4.09L16.5 9.5 11 15Z" /></svg>`,
})
export class LicenseIconComponent {}

@Component({
  selector: 'app-location-icon',
  standalone: true,
  template: `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" /></svg>`,
})
export class LocationIconComponent {}
