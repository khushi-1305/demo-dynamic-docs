import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { CheatSheetRoutingModule } from './cheat-sheet-routing.module';
import { CheatSheetComponent } from './cheat-sheet.component';

@NgModule({
  imports: [
    CheatSheetRoutingModule,
    MarkdownModule.forChild(),
  ],
  declarations: [CheatSheetComponent],
})
export class CheatSheetModule { }
