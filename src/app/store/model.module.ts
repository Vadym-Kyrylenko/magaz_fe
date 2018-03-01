import { NgModule } from '@angular/core';
import { StaticDataSource } from './static.datasource';
import { StoreModel } from './store.model';

@NgModule({
  providers: [StoreModel, StaticDataSource]
})

export class ModelModule {}
