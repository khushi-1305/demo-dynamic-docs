import { Component } from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-cheat-sheet',
  templateUrl: './cheat-sheet.component.html',
  styleUrls: ['./cheat-sheet.component.scss']
})
export class CheatSheetComponent {
  repoUrl!: string;
  url!: string;

  constructor(private sharedService: SharedService) {
    this.sharedService.getRepoUrl().subscribe(url => {
      this.repoUrl = url + '/main/docs/Introduction/glossary.md';
    });
  }
}
