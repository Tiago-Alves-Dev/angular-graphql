import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [AppComponent, DashboardComponent, StudentComponent, RoomComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ComponentsModule,
    DefaultModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
