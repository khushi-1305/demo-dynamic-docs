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

  constructor(private sharedService: SharedService, private route: ActivatedRoute, private http: HttpClient) {
    this.getRepoUrl();
    
    route.url.subscribe(params => {
      // console.log(params);
      let path = route.snapshot.data['label'];
      http.get('https://api.github.com').subscribe(res => {
        console.log(res);
      })
      this.http.get(`https://api.github.com/repos/${this.repoUrl}/contents/docs/${path}`).subscribe(res => {
        if (res instanceof Array) {
          res.forEach(item => {
            console.log(item);
          });
        }
      });
    });

  }

  getRepoUrl() {
    this.sharedService.getRepoUrl().subscribe(url => {
      this.repoUrl = url;
    });
  }
}
