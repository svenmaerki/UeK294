import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { tokenInterceptor } from './auth/interceptor/token.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserAnimationsModule, MatSnackBarModule),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideRouter(routes),
    provideAnimations(),
    provideAnimations(),
  ],
};
