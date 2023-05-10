import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DefaultComponent],
  imports: [CommonModule, SharedModule, ComponentsModule, RouterModule],
})
export class DefaultModule {}
