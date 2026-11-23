import { Component } from '@angular/core';
import { ContactComponent } from './features/contact/contact.component';
import { FooterComponent } from './features/footer/footer.component';
import { HeaderComponent } from './features/header/header.component';
import { HeroComponent } from './features/hero/hero.component';
import { ServicesComponent } from './features/services/services.component';
import { TrustComponent } from './features/trust/trust.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    TrustComponent,
    ServicesComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
})
export class App {}
