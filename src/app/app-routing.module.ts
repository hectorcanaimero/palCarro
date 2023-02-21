import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.module').then( m => m.PagesPageModule)
  },
  {
    path: 'users',
    loadChildren: () =>
      import('@module/users/users.module').then( m => m.UsersModule)
  },
  {
    path: '',
    redirectTo: '/pages/home',
    pathMatch: 'full'
  },
  {
    path: 'create',
    loadChildren: () => import('./modules/users/create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./modules/users/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./modules/menu/menu.module').then( m => m.MenuPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
