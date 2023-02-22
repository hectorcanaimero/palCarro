import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['users', 'login']);
const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.module').then( m => m.PagesPageModule),
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin }
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
    path: 'carts',
    loadChildren: () => import('./modules/carts/carts.module').then( m => m.CartsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
