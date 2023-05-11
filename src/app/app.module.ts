import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { DefaultModule } from './layouts/default/default.module';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ComponentsModule } from './components/components.module';
import { StudentComponent } from './modules/student/student.component';
import { RoomComponent } from './modules/room/room.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { AlertService } from './services/alert.service';
import { AuthGuard } from './guards/auth.guard';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { AlertComponent } from './shared/alert/alert.component';
import { HttpClientModule } from '@angular/common/http';
import { GraphqlModule } from './graphql.module';
import { ApolloModule } from 'apollo-angular';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    DashboardComponent,
    StudentComponent,
    RoomComponent,
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
  ],
  providers: [
    AlertService,
    AuthGuard,

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
