import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import { InvoiceListComponent } from '../app/pages/invoice-list/invoice-list.component';
import { EditVoiceComponent } from './shared/edit-voice/edit-voice.component';
export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, resolve: { data: UserResolver } },
  { path: 'invoice-list', component: InvoiceListComponent },
  { path: 'edit-invoice/:invoiceid', component: EditVoiceComponent }
];
