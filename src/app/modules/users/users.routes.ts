import { RouterModule, Routes } from '@angular/router';
const app: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(m => m.LoginPageModule)
  }
];

export const UsersRoutes = RouterModule.forChild(app);
