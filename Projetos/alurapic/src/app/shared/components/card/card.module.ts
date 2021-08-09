import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { NgModule } from "@angular/core";

@NgModule({
  declarations:[CardComponent],
  exports:[CardComponent],
  imports:[CommonModule]
})
export class CardModule{}
