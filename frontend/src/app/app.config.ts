import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
<<<<<<< Updated upstream
import { provideHttpClient } from '@angular/common/http';
=======
import { provideHttpClient } from '@angular/common/http'; // ✅ هذا المهم
>>>>>>> Stashed changes

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule),
<<<<<<< Updated upstream
    provideHttpClient()
=======
    provideHttpClient() // ✅ أضفه هون
>>>>>>> Stashed changes
  ]
};
