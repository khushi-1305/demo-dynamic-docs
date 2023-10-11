import { Component } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss']
})
export class GetStartedComponent {
  repoUrl!: string;
  url!: string;
  path!: string;

  constructor(private sharedService: SharedService, 
    private route: ActivatedRoute, 
    private http: HttpClient
  ) {
    this.getRepoUrl();
    this.showDocs();
  }

  getRepoUrl() {
    this.sharedService.getRepoUrl().subscribe(url => {
      this.repoUrl = url;
    });
  }

  showDocs() {
    this.path = this.route.snapshot.data['label'] || 'Getting Started';
    this.http.get(`https://api.github.com/repos/${this.repoUrl}/contents/docs/${this.path}`)
    .subscribe(res => {
      if (res instanceof Array) {
        res.forEach(item => {
          if (item.name == 'overview.md' || item.name == 'pre-requisits.md') {
            this.url = item.download_url;
          }
        });
      }
    });
  }
}
