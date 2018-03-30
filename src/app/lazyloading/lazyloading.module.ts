import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShopContentComponent} from '../shop-content/shop-content.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ShopContentComponent }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShopContentComponent]
})
export class LazyloadingModule { }
