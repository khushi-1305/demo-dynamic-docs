import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared/shared.service';
import { GetStartedComponent } from '../get-started/get-started.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  routes!: Route[];
  theme = 'light';
  showMenu = true;
  url!: string;
  repoUrl!: string;

  constructor(@Inject(DOCUMENT) private document: Document, private router: Router, 
  private sharedService: SharedService, private http: HttpClient
  ) {
    this.routes = [];
  }

  toggleTheme(): void {
    if(localStorage.getItem('color-theme') == 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
      this.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
      this.theme = 'light';
    }
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  showDocs(): void {
    if (!this.url) {
      this.repoUrl = 'https://github.com/simptel/docs.simptel.com';
    } else {
      this.repoUrl = this.url.substring(19, this.url.length);
    }
    this.sharedService.saveRepoUrl(this.repoUrl);
    this.getRoutes();
  }

  getRoutes() {
    this.http.get(`https://api.github.com/repos/${this.repoUrl}/contents/docs`).subscribe(res => {
      if (res instanceof Array) {
        res.forEach(item => {
          let path = item.name.includes(' ') ? item.name.replace(' ', '-').toLocaleLowerCase() : item.name.toLocaleLowerCase();
          this.routes.push({
            path: path,
            data: { label: item.name },
            component: GetStartedComponent
          });
          this.router.resetConfig(this.routes);
        });
      }
    });  
  }
}
