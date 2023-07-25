import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Our modules
import { SharedModule } from '../shared/shared.module';

//Components
import { HomePageComponent } from './pages/home/home-page.component';
import { SearchBoxComponent } from './components/searchBox/search-box.component';
import { CardListComponent } from './components/cardList/card-list.component';
import { CardComponent } from './components/card/card.component';




@NgModule({
  declarations: [
    HomePageComponent,
    SearchBoxComponent,
    CardListComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    HomePageComponent
  ]
})
export class GifsModule {

}
