import { Routes } from '@angular/router';

export const rootRoutes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  // Note: core root has the guard, not login then direct to the login page
  { path: 'core', loadChildren: './core/core.module#CoreModule' }
];
