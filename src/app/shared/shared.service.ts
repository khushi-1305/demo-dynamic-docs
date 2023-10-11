import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private repoUrl: Subject<string> = new BehaviorSubject<string>('simptel/docs.simptel.com');

  getRepoUrl(){
    return this.repoUrl.asObservable();
  }

  saveRepoUrl(data:string) {
    this.repoUrl.next(data);
  }
}
