import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms'; // JDR komt van de app.module
import { provideClientHydration } from '@angular/platform-browser';
import { EmployeeService } from './employee.service';//JDR: in de oude versie van angular stond dit in de app.module


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes), 
     provideHttpClient(),
      provideClientHydration(),
      NgFor,
      EmployeeService,
      FormsModule
     
    ]
}

