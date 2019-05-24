import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MobxAngularModule } from 'mobx-angular';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { rootRouterConfig } from './app.routes';
import { AuthGuard } from './core/auth.guard';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';
import { LoginComponent } from './login/login.component';
import { InvoiceListComponent } from './pages/invoice-list/invoice-list.component';
import { RegisterComponent } from './register/register.component';
import { HttpService } from './services/http.service';
import { EditVoiceComponent } from './shared/edit-voice/edit-voice.component';
import { HeaderComponent } from './shared/header/header.component';
import { LineNumberComponent } from './shared/line-number/line-number.component';
import { SupplierNameComponent } from './shared/supplier-name/supplier-name.component';
import { UserComponent } from './user/user.component';
import { UserResolver } from './user/user.resolver';

// import { LineNumberComponent } from './shared/line-number/line-number.component';
// import { SupplierNameComponent } from './shared/supplier-name/supplier-name.component';
// page
// import { LoginComponent } from './pages/login/login.component';
// components
// SupplierNameComponent,
// LineNumberComponent
// services
//  angular material
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    InvoiceListComponent,
    EditVoiceComponent,
    LineNumberComponent,
    SupplierNameComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MobxAngularModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],

  providers: [AuthService, UserService, UserResolver, AuthGuard, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {}
