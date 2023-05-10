import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { AreaComponent } from './widgets/area/area.component';
import { CardComponent } from './widgets/card/card.component';
import { PieComponent } from './widgets/pie/pie.component';

const COMPONENTS = [
  FooterComponent,
  HeaderComponent,
  SidebarComponent,
  AreaComponent,
  CardComponent,
  PieComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, SharedModule],
  exports: [...COMPONENTS],
})
export class ComponentsModule {}
