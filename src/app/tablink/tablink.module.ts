import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablinkPageRoutingModule } from './tablink-routing.module';

import { TablinkPage } from './tablink.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TablinkPageRoutingModule
  ],
  declarations: [TablinkPage]
})
export class TablinkPageModule {}
