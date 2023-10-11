import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { GetStartedRoutingModule } from './get-started-routing.module';
import { GetStartedComponent } from './get-started.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    GetStartedRoutingModule,
    MarkdownModule.forChild(),
    FormsModule
  ],
  declarations: [GetStartedComponent],
})
export class GetStartedModule { }
