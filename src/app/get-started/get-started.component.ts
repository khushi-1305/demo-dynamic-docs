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
  dirUrl!: string;
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
          if (item.type == 'dir') {
            this.showDirectoryFiles(item);
          } else if (item.type == 'file') {
            this.url = this.getDownloadUrl(item);
          }
        });
      }
    });
  }

  showDirectoryFiles(item: any) {
    this.http.get(`https://api.github.com/repos/${this.repoUrl}/contents/docs/${this.path}/${item.name}`)
    .subscribe(dirRes => {
      if (dirRes instanceof Array) {
        dirRes.forEach(file => {
          this.dirUrl = this.getDownloadUrl(file);
        });
      }
    });
  }

  getDownloadUrl(item: any) {
    let ext = item.name.substring(item.name.length-2, item.name.length);
    if (ext == 'md') {
      return item.download_url;
    }
  }
}
