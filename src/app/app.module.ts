import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { DefaultModule } from './layouts/default/default.module';
import { AlertService } from './services/alert.service';
import { AuthGuard } from './guards/auth.guard';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { AlertComponent } from './shared/alert/alert.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GraphqlModule } from './graphql.module';
import { ApolloModule } from 'apollo-angular';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { environment } from 'src/environments/environment';

import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ComponentsModule } from './components/components.module';
import { StudentComponent } from './modules/student/student.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { JwtService } from './interceptors/jwt.service';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    DashboardComponent,
    StudentComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ComponentsModule,
    DefaultModule,
    HttpClientModule,
    ApolloModule,
    GraphqlModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireMessagingModule,
  ],
  providers: [
    AlertService,
    AuthGuard,

    { provide: HTTP_INTERCEPTORS, useClass: JwtService, multi: true },

    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },

    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
