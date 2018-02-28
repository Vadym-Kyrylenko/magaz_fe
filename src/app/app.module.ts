import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {ShopComponent} from './shop/shop.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {ShopContentComponent} from './shop-content/shop-content.component';

import {AdminComponent} from './admin/admin.component';
// import {StoreModel} from './store/store.model';
import {ModelModule} from './store/model.module';

// const homeRoutes: Routes = [
//   //{ path: '', component: ShopComponent},
//   { path: 'admin', component: AdminComponent}
//   // { path: 'contacts', component: ContactsComponent}
//   // { path: 'callbackbtn', component: CallBackComponent},
// ];

const appRoutes: Routes = [
  { path: './', component: ShopComponent},
  { path: 'admin', component: AdminComponent},
  { path: '**', redirectTo: './' }
];

@NgModule({
  declarations: [
    AppComponent, ShopComponent, FooterComponent, HeaderComponent, ShopContentComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    HttpClientModule,
    ModelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
