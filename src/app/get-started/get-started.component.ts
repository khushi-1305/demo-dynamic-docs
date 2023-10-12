import { Component } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss']
})
export class GetStartedComponent {
  repoName!: string;
  pageUrl!: string;
  directoryUrl!: string;
  pageName!: string;
  directories!: Object;
  files!: Object;
  isMenuOpen: boolean = true;

  constructor(
    private sharedService: SharedService, 
    private route: ActivatedRoute, 
    private http: HttpClient,
    private router: Router
  ) {
    this.getRepoUrl();
    this.showDocs();
  }

  getRepoUrl() {
    this.sharedService.getRepoUrl().subscribe(url => {
      this.repoName = url;
    });
  }

  openSubMenu(path:string) {
    path = path.replace(' ', '-').toLowerCase();
    this.router.navigateByUrl(path);
    this.getMenuItems()
  }

  toggleSubMenu() {
    this.isMenuOpen ? 
      this.isMenuOpen = false : 
      this.isMenuOpen = true;
  }

  getMenuItems() {
    this.http.get(`https://api.github.com/repos/${this.repoName}/contents/docs`)
    .subscribe(res => {
      this.directories = res;
    });
  }

  showDocs() {
    this.getMenuItems();
    this.pageName = this.route.snapshot.data['label'] || 'Getting Started';
    this.http.get(`https://api.github.com/repos/${this.repoName}/contents/docs/${this.pageName}`)
    .subscribe(res => {      
      this.files = res;
      if (res instanceof Array) {
        res.forEach(item => {
          if (item.type == 'dir') {
            this.showDirectoryFiles(item);
          } else if (item.type == 'file') {
            this.pageUrl = this.getDownloadUrl(item);
          }
        });
      }
    });
  }

  showDirectoryFiles(item: any) {
    this.http.get(`https://api.github.com/repos/${this.repoName}/contents/docs/${this.pageName}/${item.name}`)
    .subscribe(res => {
      if (res instanceof Array) {
        res.forEach(file => {
          this.directoryUrl = this.getDownloadUrl(file);
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
